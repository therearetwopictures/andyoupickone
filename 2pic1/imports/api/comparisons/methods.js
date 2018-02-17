// Methods related to comparisons
import { Meteor } from "meteor/meteor";
import Comparisons from "./comparisons.js";
import UserData from "../userData/userData";
import {
  downloadImage,
  getGCSUrl,
  getUniqueImgNameFromSeed
} from "../helpers/imageUtils.js";
import { randNum, searchWords, getUrl } from "../helpers/comparisonUtils";
import { classifyImage } from "./watsonHelpers/watson";

const watsonSettings = Meteor.settings.watson;

Meteor.methods({
  "comparisons.flagError"(compId) {
    Comparisons.update(compId, { $inc: { errorCount: 1 } });
  },
  "comparisons.getByCompId"(compId) {
    //const hasSeen = Meteor.call("userData.userHasPicked", compId);

    const result = Comparisons.find(compId, {
      field: {
        A: 1,
        B: 1,
        urlB: 1,
        urlA: 1
      }
    }).fetch();
    //  if (!result[0].A && !result[0].B) Meteor.call("comparisons.addOne");
    return result;
  },
  "comparisons.getRandOne"() {
    const picks = Meteor.call("userData.getPicks");
    // console.log("Picks: " + picks);

    // let random = Comparisons.aggregate([
    //   { $match: { _id: { $not: { $in: ["$_id", picks] } } } },
    //   { $sample: { size: 1 } }
    // ]);
    let random = Comparisons.aggregate([
      { $match: { _id: { $not: { $in: picks } } } },
      { $sample: { size: 1 } },
      {
        $project: {
          A: 1,
          B: 1,
          urlB: 1,
          urlA: 1
        }
      }
    ]);
    //if (!random[0].A && !random[0].B) Meteor.call("comparisons.addOne");
    return random;
  },
  async "comparisons.addOne"() {
    const [urlA, seedA, fileTypeA] = await getUrl();
    const [urlB, seedB, fileTypeB] = await getUrl();
    // console.log(seedA);

    const compId = new Meteor.Collection.ObjectID()._str;

    const gcsUrlA = getUniqueImgNameFromSeed(compId, seedA, "A", fileTypeA);
    const gcsUrlB = getUniqueImgNameFromSeed(compId, seedB, "B", fileTypeB);
    try {
      await downloadImage(urlA, gcsUrlA);
      await downloadImage(urlB, gcsUrlB);
    } catch (e) {
      Meteor.call("comparisons.addOne");
      console.log(e, "hey, nice catch!!~");
      return;
    }

    await Comparisons.insert({
      _id: compId,
      urlA: getGCSUrl(gcsUrlA),
      seedA,
      urlB: getGCSUrl(gcsUrlB),
      seedB
    });
  },
  "comparisons.updatePicks"(compId, pick) {
    if (pick && compId) {
      let update = {};
      let inc = {};
      inc[pick] = 1;
      update = { $inc: inc };
      Comparisons.update(
        {
          _id: compId
        },
        update
      );
    }
  },
  //
  // @returns an array of results:
  // - empty in the case of no picks made in the db
  // - array with both results in the case where highest picks are equal
  // - array of one result of either A or B
  "comparisons.getMostPopularImage"() {
    let query = { A: { $ne: null } };
    let options = { fields: { A: 1, urlA: 1 }, sort: { A: -1 }, limit: 1 };
    const getMostPopularImageA = Comparisons.find(query, options).fetch();

    query = { B: { $ne: null } };
    options = { fields: { B: 1, urlB: 1 }, sort: { B: -1 }, limit: 1 };
    const getMostPopularImageB = Comparisons.find(query, options).fetch();

    // Rare edge case where nothing has been picked in the db at all
    if (
      getMostPopularImageA[0].A === null &&
      getMostPopularImageB[0].B === null
    )
      return [];
    else if (getMostPopularImageA[0].A === getMostPopularImageB[0].B)
      // Case where highest A and B are equal
      return [getMostPopularImageA[0], getMostPopularImageB[0]];
    else {
      return getMostPopularImageA[0].A > getMostPopularImageB[0].B
        ? getMostPopularImageA
        : getMostPopularImageB;
    }
  },
  // Generate image tags. No arguments, makes database query inside function
  // Function returns undefined as it is solely for updating database
  "comparisons.classifyImage"() {
    comps = Comparisons.find({ tagsA: null }, { limit: 30 }).fetch();
    console.log(comps);
    comps.forEach(comp => {
      for (let i = 0; i < 2; i++) {
        let img = "";
        let url = "";
        i < 1 ? (img = "A") : (img = "B");
        i < 1 ? (url = comp.urlA) : (url = comp.urlB);
        console.log("url:", url);

        let defaultParameters = {
          api_key: watsonSettings.api_key,
          imageurl: url,
          use_unauthenticated: false
        };

        classifyImage(defaultParameters)
          .then(results => {
            let tags = `tags${img}`;
            results.images[0].classifiers[0].classes.forEach(tag => {
              Comparisons.update(
                { _id: comp._id },
                { $push: { [tags]: { class: tag.class, score: tag.score } } }
              );
            });
          })
          .catch(error => console.log(error.message));
      }
    });
  }
});
