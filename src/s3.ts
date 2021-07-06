import S3 from 'aws-sdk/clients/s3';
import uuid from 'uuid';
import redis from 'redis';

const dotenv = require('dotenv').config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  apiVersion: '2006-03-01',
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
});

export const getImage = async (imageID: string) => {
  //   const file;
};

export const generateUploadURL = async (type: string) => {
  const imageName = `images/${uuid.v4()}.${type}`;

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  return await s3.getSignedUrlPromise('putObject', params);
};
