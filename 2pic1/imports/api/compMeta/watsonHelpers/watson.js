// const watson = require("watson-developer-cloud");
// const apiKey = require("../../../../settings.json");

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
        console.log("inside watson:", res);
        resolve(res);
      }
    });
  });
}

const defaultParameters = {
  api_key: "",
  imageurl:
    "https://raw.githubusercontent.com/watson-developer-cloud/doc-tutorial-downloads/master/visual-recognition/fruitbowl.jpg",
  url: "https://sandbox-watson-proxy.mybluemix.net/visual-recognition/api",
  use_unauthenticated: true
};
