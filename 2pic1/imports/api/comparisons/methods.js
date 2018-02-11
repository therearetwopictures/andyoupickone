// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import Comparisons from "./comparisons.js";
import CompMeta from "../compMeta/compMeta";
import {
  downloadImage,
  getAWSUrl,
  getUniqueImgNameFromSeed
} from "../helpers/imageUtils.js";
import { randNum, searchWords, getUrl } from "../helpers/comparisonUtils";

Meteor.methods({
  "comparisons.getRandOne"(userId = null) {
    // Users.find(userID, { compId })[{}];
    return Comparisons.aggregate([{ $sample: { size: 1 } }]);
  },
  "comparisons.getRandFive"(userId = null) {
    return Comparisons.aggregate([{ $sample: { size: 5 } }]);
  },
  async "comparisons.addOne"() {
    const [urlA, seedA, fileTypeA] = await getUrl();
    const [urlB, seedB, fileTypeB] = await getUrl();
    // console.log(seedA);

    const compId = new Meteor.Collection.ObjectID()._str;

    const awsUrlA = await getUniqueImgNameFromSeed(
      compId,
      seedA,
      "A",
      fileTypeA
    );
    const awsUrlB = await getUniqueImgNameFromSeed(
      compId,
      seedB,
      "B",
      fileTypeB
    );
    try {
      await downloadImage(urlA, awsUrlA);
      await downloadImage(urlB, awsUrlB);
    } catch (e) {
      Meteor.call("comparisons.addOne");
      console.log(e, "hey, nice catch!!~");
      return;
    }
    console.log(getAWSUrl(awsUrlA));
    console.log(getAWSUrl(awsUrlB));
    await Comparisons.insert({
      _id: compId,
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
