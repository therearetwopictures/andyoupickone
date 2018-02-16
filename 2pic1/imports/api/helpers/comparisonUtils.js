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
    .join(" ");

export const getUrl = () => {
  let imageSearch = google(9);
  let url = undefined;
  let seedWords = undefined;
  let fileType = undefined;
  let apiKeyErrorCount = 0;
      setTimeout(() => {
        resolve();
      }, 1500);
    
    seedWords = searchWords();
    // console.log(seedWords);
    let imageObj = [];
    try {
      imageObj = await imageSearch.search(seedWords + " imagesize:500x500");
    } catch (e) {
      console.log(e.statusCode, "switch the key!!~");
    }
    // if (!imageObj[0]) {
    //   flag words here
    // }
    // let flagWord = true;
    while (imageObj[0]) {
      let currentIndex = Math.floor(Math.random() * imageObj.length);
      let breakVar = false;
      console.log("imageloop on ", seedWords);
      url = imageObj[currentIndex].url;
      /\.jpg|\.png|\.jpeg/.test(url)
        ? await fetch(url)
            .then(res => {
              if (!/^image/.test(res.headers.get("content-type")))
                throw new Error("not actually an image.. c'mon google!");
              fileType = res.headers.get("content-type").split("/")[1];
              // flagWord = false;
              breakVar = true;
            })
            .catch(e => {
              console.log(e.message);
              imageObj = imageObj.reduce(
                (acc, val, i) => (i === currentIndex ? acc : acc.concat(val)),
                []
              );
            })
        : (imageObj = imageObj.reduce(
            (acc, val, i) => (i === currentIndex ? acc : acc.concat(val)),
            []
          ));
      if (breakVar) break;
      url = undefined;
    }
    //flag words here
  
  return [url, seedWords, fileType];
};

export const randNum = () => Math.floor(Math.random() * 143090).toString();
