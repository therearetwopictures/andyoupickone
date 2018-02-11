// https://www.npmjs.com/package/s3
const s3 = require("s3");
//https://www.npmjs.com/package/download-file
const download = require("download-file");
const { Meteor } = require("meteor/meteor");

const AWS_BUCKET = Meteor.settings.AWS.bucket;
const dir = "img/";
const client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: `${Meteor.settings.AWS.accessKeyId}`,
    secretAccessKey: `${Meteor.settings.AWS.secretAccessKey}`
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  }
});

//
// @params file existing locally in private
// @returns
const uploadImageToAWS = fileToUpload => {
  const params = {
    localFile: `${fileToUpload}`,

    s3Params: {
      Bucket: `${AWS_BUCKET}`,
      Key: `${fileToUpload}`
      // other options supported by putObject, except Body and ContentLength.
      // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    }
  };
  const uploader = client.uploadFile(params);

  uploader.on("error", function(err) {
    console.error("unable to upload:", err.stack);
  });

  uploader.on("end", function() {
    console.log("done uploading");
  });
  // TODO: delete file after upload
  //console.log("http: " + s3.getPublicUrlHttp(AWS_BUCKET, fileToUpload));
  //return s3.getPublicUrlHttp(AWS_BUCKET, fileToUpload);
};

//
// @params file as a url to download
// @returns name of file downloaded
export const downloadImageFromAWS = fileToDownload => {
  const params = {
    localFile: `${fileToDownload}`,

    s3Params: {
      Bucket: `${AWS_BUCKET}`,
      Key: `${fileToDownload}`
    }
  };
  const downloader = client.downloadFile(params);
  downloader.on("error", function(err) {
    console.error("unable to download:", err.stack);
  });

  downloader.on("end", function() {});
  return fileToDownload;
};

//
// @params url of image to download
// @returns a promise
export const downloadImage = (url, downloadedFileName) => {
  return new Promise(function(resolve, reject) {
    const options = {
      directory: `${dir}`,
      filename: `${downloadedFileName}`
    };

    download(url, options, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(uploadImageToAWS(`${options.directory}${options.filename}`));
      }
    });
  });
};

//
// @params url with a file name and extension at the end
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
// @params url uploaded to AWS with dir
// @returns the AWS url for the uploaded image
export const getAWSUrl = url => {
  return s3.getPublicUrlHttp(AWS_BUCKET, "img/" + url);
};
