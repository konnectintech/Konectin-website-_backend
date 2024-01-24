const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { promises: fs } = require("fs");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const uploadFile = (fileName, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileContent = await fs.readFile(fileName);
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: fileContent,
      };

      // Sending the PutObjectCommand and waiting for it to complete
      await s3Client.send(new PutObjectCommand(uploadParams));

      // Constructing the S3 file URL based on the bucket and key
      const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

      // Resolving with the file URL
      resolve(fileUrl);
    } catch (error) {
      reject(error);
    }
  });
};

const downloadFile = async (localFilePath, key) => {
  try {
    const downloadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    const { Body } = await s3Client.send(new GetObjectCommand(downloadParams));

    await fs.writeFile(localFilePath, Body);

    return localFilePath;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadFile, downloadFile };
