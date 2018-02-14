import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";
import "isomorphic-fetch";

const google = num =>
  new GoogleImages(
    Meteor.settings.googleSearch[num].engineId,
    Meteor.settings.googleSearch[num].apiKey
  );
export const searchWords = () =>
  Dictionary.find(
    { $or: [{ id: randNum() }, { id: randNum() }] },
    { fields: { _id: 0, word: 1 } }
  )
    .fetch()
    .map(obj => obj.word)
    .join(" ") + " imagesize:500x500";

export const getUrl = async () => {
  let imageSearch = google(Math.floor(Math.random() * 6));
  let url = undefined;
  let seedWords = undefined;
  let fileType = undefined;
  let apiKeyErrorCount = 0;
  while (!url) {
    if (apiKeyErrorCount > 42) process.exit();
    seedWords = searchWords();
    let imageObj = [];
    try {
      imageObj = await imageSearch.search(seedWords);
    } catch (e) {
      apiKeyErrorCount++;
      console.log(e.statusCode, "switch the key!!~");
    }
    if (imageObj[0]) {
      url = imageObj[Math.floor(Math.random() * imageObj.length)].url;
      /\.jpg|\.png|\.jpeg/.test(url)
        ? await fetch(url)
            .then(res => {
              if (!/^image/.test(res.headers.get("content-type")))
                throw new Error("not actually an image.. c'mon google!");
              fileType = res.headers.get("content-type").split("/")[1];
            })
            .catch(e => {
              console.log(e.message);
              url = undefined;
            })
        : (url = undefined);
    }
  }
  return [url, seedWords.slice(0, -18), fileType];
};

export const randNum = () => Math.floor(Math.random() * 143090).toString();
