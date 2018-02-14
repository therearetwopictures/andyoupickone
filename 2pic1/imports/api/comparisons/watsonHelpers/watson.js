import Comparisons from "./comparisons.js";

export function classifyImage(params) {
  return new Promise((resolve, reject) => {
    const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
    let url = params.url;
    let use_unauthenticated = params.use_unauthenticated || false;

    const visual_recognition = new VisualRecognitionV3({
      api_key: params.api_key,
      version_date: "2016-05-20",
      url: url,
      use_unauthenticated: use_unauthenticated
    });

    visual_recognition.classify({ url: params.imageurl }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function batchClassifyImages() {}
