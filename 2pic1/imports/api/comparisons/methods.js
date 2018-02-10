// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import Comparisons from "./comparisons.js";
import CompMeta from "../compMeta/compMeta";
import GoogleImages from "google-images";
import {
  downloadImage,
  getAWSUrl,
  getUniqueImgNameFromUrl
} from "../helpers/imageUtils.js";
import { randNum, searchWords, getUrl } from "../helpers/comparisonUtils";

const imageSearch = new GoogleImages(
  Meteor.settings.googleSearch[0].engineId,
  Meteor.settings.googleSearch[0].apiKey
);
Meteor.methods({
  "comparisons.getRandOne"(userId = null) {
    Users.find(userID, { compId })[{}];
    return Comparisons.aggregate([{ $sample: { size: 1 } }]);
  },
  "comparisons.getRandFive"(userId = null) {
    return Comparisons.aggregate([{ $sample: { size: 5 } }]);
  },
  async "comparisons.addOne"() {
    const [urlA, seedA] = await getUrl();
    const [urlB, seedB] = await getUrl();
    // console.log(seedA);

    const awsUrlA = await getUniqueImgNameFromUrl(urlA);
    await downloadImage(urlA, awsUrlA);
    const awsUrlB = await getUniqueImgNameFromUrl(urlB);
    await downloadImage(urlB, awsUrlB);

    const compId = await Comparisons.insert({
      urlA: getAWSUrl(awsUrlA),
      urlB: getAWSUrl(awsUrlB)
    });

    await CompMeta.insert({
      _id: compId,
      urlA: getAWSUrl(awsUrlA),
      seedA,
      urlB: getAWSUrl(awsUrlB),
      seedB
    });
  }
});
