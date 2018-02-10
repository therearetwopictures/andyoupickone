import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";

const imageSearch = new GoogleImages(
  Meteor.settings.googleSearch[0].engineId,
  Meteor.settings.googleSearch[0].apiKey
);
export const searchWords = () =>
  Dictionary.find(
    { $or: [{ id: randNum() }, { id: randNum() }, { id: randNum() }] },
    { fields: { _id: 0, word: 1 } }
  )
    .fetch()
    .map(obj => obj.word)
    .join(" ") + " imagesize:500x500";

export const getUrl = async () => {
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

export const randNum = () => Math.floor(Math.random() * 143090).toString();
