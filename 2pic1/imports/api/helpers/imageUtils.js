//https://www.npmjs.com/package/download-file
const download = require("download-file");
const { Meteor } = require("meteor/meteor");

const gcloud = require("google-cloud-storage-standalone");
const gcstorage = gcloud.storage({
  projectId: Meteor.settings.GCS.projectId,
  keyFilename: Assets.absoluteFilePath(Meteor.settings.GCS.JSONKeyFile),
  email: Meteor.settings.GCS.email
});

const GOOGLE_STORAGE_URL = `https://storage.googleapis.com/${
  Meteor.settings.GCS.bucket
}/`;

//
// @params file existing locally in private
// @returns
const uploadImageToGCS = fileToUpload => {
  const bucket = gcstorage.bucket(Meteor.settings.GCS.bucket);
  console.log(fileToUpload);
  bucket.upload(fileToUpload, function(err, file) {
    if (!err) {
      console.log("uploaded: ");
    } else {
      console.error("unable to upload:", err);
    }
  });

  // TODO: delete file after upload
};

//
// @params url of image to download, name of file upon download
// @returns a promise
export const downloadImage = (url, downloadedFileName) => {
  return new Promise(function(resolve, reject) {
    const options = {
      directory: "img/",
      filename: `${downloadedFileName}`
    };

    download(url, options, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(uploadImageToGCS(`${options.directory}${options.filename}`));
      }
    });
  });
};

//
// @params comparison id, seed values, picture A or picture B, file extension
// @returns the file name and extension prepended with date timestamp
// format: ex. 2018-02-09T20:54:55.686Z
export const getUniqueImgNameFromSeed = (compId, seed, aOrB, fileType) => {
  if (fileType === "jpeg") fileType = "jpg";
  const date = new Date();
  return `${date.toISOString()}-${compId}-${seed
    .split(" ")
    .join("_")}-${aOrB}.${fileType}`;
};

//
// @params url uploaded to Google Cloud Storage (GCS)
// @returns the GCS url for the uploaded image
export const getGCSUrl = url => {
  return GOOGLE_STORAGE_URL + url;
};
