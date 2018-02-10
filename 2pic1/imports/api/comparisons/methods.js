// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Comparisons from "./comparisons.js";
import CompMeta from "../compMeta/compMeta";
import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";
import {
  downloadImage,
  getAWSUrl,
  getUniqueImgNameFromUrl
} from "../helpers/imageUtils.js";

const imageSearch = new GoogleImages(
  Meteor.settings.googleSearch[0].engineId,
  Meteor.settings.googleSearch[0].apiKey
);

const searchWords = () =>
  Dictionary.find(
    { $or: [{ id: randNum() }, { id: randNum() }, { id: randNum() }] },
    { fields: { _id: 0, word: 1 } }
  )
    .fetch()
    .map(obj => obj.word)
    .join(" ") + " imagesize:500x500";

const getUrl = async () => {
  let url = undefined;
  let seedWords = undefined;
  while (!url) {
    seedWords = searchWords();
    const imageObj = await imageSearch.search(seedWords);
    if (imageObj[0]) {
      url = imageObj[Math.floor(Math.random() * imageObj.length)].url;
    }
  }
  return [url, seedWords.slice(0, -18)];
};

const randNum = () => Math.floor(Math.random() * 143090).toString();

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
