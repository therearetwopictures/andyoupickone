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
    // if (!result[0].A && !result[0].B) Meteor.call("comparisons.addOne");
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
    // if (!random[0].A && !random[0].B) Meteor.call("comparisons.addOne");
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
  "comparisons.classifyImage"(compId, ...urls) {
    urls.forEach((url, i) => {
      let img = "";
      i < 1 ? (img = "A") : (img = "B");

      let defaultParameters = {
        api_key: watsonSettings.api_key,
        imageurl: url,
        use_unauthenticated: false
      };
      classifyImage(defaultParameters)
        .then(results => {
          let tags = `tags${img}`;
          console.log(tags);
          // CompMeta.update({ _id: compId }, { $set });
          results.images[0].classifiers[0].classes.forEach(tag => {
            // console.log(tag);
            Comparisons.update(
              { _id: compId },
              { $push: { [tags]: { class: tag.class, score: tag.score } } }
            );
          });

          // console.log(JSON.stringify(results, null, 2));
        })
        .catch(error => console.log(error.message));
    });
  }
});
