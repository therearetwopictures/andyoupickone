import { Dictionary } from "../dictionary/dictionary.js";
import GoogleImages from "google-images";
import grab from "node-fetch";

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

export const getUrl = () => {
  let imageSearch = google(9);
  let url = undefined;
  let seedWords = undefined;
  let fileType = undefined;
  let apiKeyErrorCount = 0;

  recursiveLookup = async (url, seedWords, fileType) => {
    if (apiKeyErrorCount === 2) {
      return null;
    }
    if (url) {
      return [url, seedWords.slice(0, -18), fileType];
    }
    seedWords = searchWords();
    // console.log(seedWords);
    let imageObj = [];
    try {
      imageObj = await imageSearch.search(seedWords);
      console.log(imageObj);
    } catch (e) {
      apiKeyErrorCount++;
      console.log(e.statusCode, "switch the key!!~");
    }
    if (imageObj[0]) {
      imageObj.some(img => {
        url = img.url;
        /\.jpg|\.png|\.jpeg/.test(url)
          ? grab(url)
              .then(res => {
                if (!/^image/.test(res.headers.get("content-type")))
                  throw new Error("not actually an image.. c'mon google!");
                fileType = res.headers.get("content-type").split("/")[1];
                return true;
              })
              .catch(e => {
                console.log(e.message);
                url = undefined;
              })
          : (url = undefined);
      });
      // url = imageObj[Math.floor(Math.random() * imageObj.length)].url;
      // /\.jpg|\.png|\.jpeg/.test(url)
      //   ? await grab(url)
      //       .then(res => {
      //         if (!/^image/.test(res.headers.get("content-type")))
      //           throw new Error("not actually an image.. c'mon google!");
      //         fileType = res.headers.get("content-type").split("/")[1];
      //       })
      //       .catch(e => {
      //         console.log(e.message);
      //         url = undefined;
      //       })
      //   : (url = undefined);
      recursiveLookup(url, seedWords, fileType);
    }
  };
  return recursiveLookup(url);
};

export const randNum = () => Math.floor(Math.random() * 143090).toString();
