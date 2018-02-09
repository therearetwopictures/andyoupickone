// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Comparisons from "./comparisons.js";
import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";

const imageSearch = new GoogleImages("server id here", "api key here");

const getUrl = async () => {
  const searchWords = () =>
    Dictionary.find(
      { $or: [{ id: randNum() }, { id: randNum() }, { id: randNum() }] },
      { fields: { _id: 0, word: 1 } }
    )
      .fetch()
      .map(obj => obj.word)
      .join(" ") + " imagesize:500x500";

  let url = undefined;
  while (!url) {
    const imageObj = (await imageSearch.search(await searchWords()))[0];
    if (imageObj) url = imageObj.url;
  }

  console.log(url);

  return url;
};

const randNum = () => Math.floor(Math.random() * 143090).toString();
Meteor.methods({
  "comparisons.addOne"() {
    (async () => {
      const urlA = await getUrl();
      const urlB = await getUrl();
      Comparisons.insert({
        urlA,
        urlB,
        createdAt: new Date()
      });
    })();
  }
});
