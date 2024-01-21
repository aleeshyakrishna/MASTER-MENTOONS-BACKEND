const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAQ3HR7RPBWHS6MFK2',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

const s3 = new AWS.S3();
const bucketName = 'mentoons';

module.exports = {
  uploadFile: async (files) => {
    console.log(files, "filesssssss");
    const thumbnail = files.thumbnail;
    const source = files.source;
    const thumbnailBuffer = thumbnail[0].buffer;
    const sourceBuffer = source[0].buffer;

    const paramsThumbnail = {
      Bucket: bucketName,
      Key: `thumbnails/${thumbnail[0].originalname}`,
      Body: thumbnailBuffer,
    };

    const paramsSource = {
      Bucket: bucketName,
      Key: `source/${source[0].originalname}`,
      Body: sourceBuffer,
    };

    const uploadThumbnailPromise = s3.upload(paramsThumbnail).promise();
    const uploadSourcePromise = s3.upload(paramsSource).promise();

    // Wait for both uploads to complete
    const [thumbnailResult, sourceResult] = await Promise.all([
      uploadThumbnailPromise,
      uploadSourcePromise,
    ]);

    // Return the results of both uploads
    return {
      thumbnail: thumbnailResult,
      source: sourceResult,
    };
  },
};
