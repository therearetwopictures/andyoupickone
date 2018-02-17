// Methods related to comparisons
import { Meteor } from "meteor/meteor";
import Comparisons from "./comparisons.js";
import UserData from "../userData/userData";
import {
  downloadImage,
  getGCSUrl,
  getUniqueImgNameFromSeed,
  error403
} from "../helpers/imageUtils.js";
import { createLeastOrMostPopular } from "../helpers/queryCreators";

import { randNum, searchWords, getUrl } from "../helpers/comparisonUtils";
import { classifyImage } from "./watsonHelpers/watson";

const watsonSettings = Meteor.settings.watson;

Meteor.methods({
  "comparisons.flagError"(compId) {
    Comparisons.update(compId, { $inc: { errorCount: 1 } });
  },
  "comparisons.getByCompId"(compId) {
    const hasSeen = Meteor.call("userData.userHasPicked", compId);

    const result = Comparisons.find(compId, {
      field: {
        A: 1,
        B: 1,
        urlB: 1,
        urlA: 1
      }
    }).fetch();
    result[0].hasSeen = hasSeen;
    return result;
  },
  "comparisons.getRandOne"() {
    const picks = Meteor.call("userData.getPicks");
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
    return random;
  },
  async "comparisons.addOne"() {
    const [urlA, seedA, fileTypeA] = await getUrl();
    const [urlB, seedB, fileTypeB] = await getUrl();

    const compId = new Meteor.Collection.ObjectID()._str;

    const gcsUrlA = getUniqueImgNameFromSeed(compId, seedA, "A", fileTypeA);
    const gcsUrlB = getUniqueImgNameFromSeed(compId, seedB, "B", fileTypeB);
    try {
      await downloadImage(urlA, gcsUrlA);
      await downloadImage(urlB, gcsUrlB);
    } catch (e) {
      if (!error403) Meteor.call("comparisons.addOne");
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
  // @returns an array of results:
  // - empty in the case no picks have been made in the db
  // - array of one or more results (limited to 5)
  // nb: excludes results that have an even match of 0
  "comparisons.getEvenComparison"() {
    let query = Comparisons.aggregate([
      {
        $group: {
          _id: { urlA: "$urlA", urlB: "$urlB", A: "$A", B: "$B" }
        }
      },
      {
        $project: {
          totalAB: { $eq: ["$_id.A", "$_id.B"] },
          sumAB: { $sum: ["$_id.A", "$_id.B"] }
        }
      },
      { $sort: { totalAB: -1 } },
      { $match: { $and: [{ totalAB: { $eq: true } }, { sumAB: { $ne: 0 } }] } },
      { $project: { totalAB: 0, sumAB: 0 } },
      { limit: 5 }
    ]);
    return query;
  },
  // @returns an array of results:
  // - empty in the case no picks have been made in the db
  // - array of one result (the first one if there are multiples w/same)
  // limited to 5, if multiples exist
  "comparisons.getMostPopularComparison"() {
    let query = Comparisons.aggregate([
      {
        $group: {
          _id: { urlA: "$urlA", urlB: "$urlB", A: "$A", B: "$B" }
        }
      },
      { $project: { totalAB: { $sum: ["$_id.A", "$_id.B"] } } },
      { $sort: { totalAB: -1 } },
      { $limit: 5 }
    ]);
    return query;
  },
  // @returns an array or results:
  // - empty in the case no picks have been made in the db
  // - array with both results in the case where the lowest picks are equal
  // - array of one result
  "comparisons.getLeastPopularImage"() {
    let query = createLeastOrMostPopular("A", 1);
    const getLeastPopularImageA = Comparisons.find(query[0], query[1]).fetch();

    query = createLeastOrMostPopular("B", 1);
    const getLeastPopularImageB = Comparisons.find(query[0], query[1]).fetch();

    // Rare edge case where nothing has been picked in the db at all
    if (
      getLeastPopularImageA[0].A === null &&
      getLeastPopularImageB[0].B === null
    )
      return [];
    else if (getLeastPopularImageA[0].A === getLeastPopularImageB[0].B)
      // Case where highest A and B are equal
      return [getLeastPopularImageA[0], getLeastPopularImageB[0]];
    else {
      return getLeastPopularImageA[0].A > getLeastPopularImageB[0].B
        ? getLeastPopularImageA
        : getLeastPopularImageB;
    }
  },
  //
  // @returns an array of results:
  // - empty in the case of no picks made in the db
  // - array with both results in the case where highest picks are equal
  // - array of one result of either A or B
  "comparisons.getMostPopularImage"() {
    let query = createLeastOrMostPopular("A", -1);
    const getMostPopularImageA = Comparisons.find(query[0], query[1]).fetch();

    query = createLeastOrMostPopular("B", -1);
    const getMostPopularImageB = Comparisons.find(query[0], query[1]).fetch();

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
  "comparisons.classifyImage"(compId, ...urls) {
    comps = Comparisons.find({ tagsA: null }, { limit: 2 }).fetch();
    console.log(comps);
    comps.forEach(comp => {
      for (let i = 0; i < 2; i++) {
        let img = "";
        let url = "";
        i < 1 ? (img = "A") : (img = "B");
        i < 1 ? (url = comp.urlA) : (url = comp.urlB);
        console.log("url:", url);

        let defaultParameters = {
          api_key: watsonSettings.api_key2,
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
