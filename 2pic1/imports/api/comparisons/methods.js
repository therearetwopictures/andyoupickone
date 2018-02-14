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

    return Comparisons.find(compId).fetch();
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
      { $sample: { size: 1 } }
    ]);
    // let random = Comparisons.find({ _id: { $not: { $in: picks } } }).fetch();

    // random = [random[Math.floor(Math.random() * random.length)]];
    // if the total number of picks for this comparison is 0, then
    // it has not been seen and we need to generate another comparison

    // for the db
    (async () => {
      total = Comparisons.aggregate([
        {
          $match: {
            $and: [
              {
                _id: random[0]._id,
                // TODO: delete on production? included as of now, since A, B is optional
                A: { $ne: null },
                B: { $ne: null }
              }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            total: { $add: ["$A", "$B"] }
          }
        }
      ]);
      console.log(total);
      if (total !== undefined || total[0].total === 0)
        Meteor.call("comparisons.addOne");
    })();
    console.log(random);
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
      urlB: getGCSUrl(gcsUrlB)
    });

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
