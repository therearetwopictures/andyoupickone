// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Comparisons from "./comparisons.js";
import CompMeta from "../compMeta/compMeta";
import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";

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
    const imageObj = (await imageSearch.search(seedWords))[0];
    if (imageObj) url = imageObj.url;
  }
  return [url, seedWords.slice(0, -18)];
};

const randNum = () => Math.floor(Math.random() * 143090).toString();

Meteor.methods({
  "comparisons.getRandOne"() {
    return Comparisons.aggregate([{ $sample: { size: 1 } }]);
  },
  async "comparisons.addOne"() {
    const [urlA, seedA] = await getUrl();
    const [urlB, seedB] = await getUrl();
    // console.log(seedA);

    // lindseys function here

    Comparisons.insert({
      urlA,
      urlB
    });

    CompMeta.insert({
      urlA,
      seedA,
      urlB,
      seedB
    });
  }
});
