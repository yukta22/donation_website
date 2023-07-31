import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import express from "express";
import { parse } from "url";

const app = express();

const client = new S3Client({});

export const uploadS3 = async (fileName, fileBuffer) => {
  const command = new PutObjectCommand({
    Bucket: "fullstackyukta",
    Key: fileName,
    Body: fileBuffer,
  });

  try {
    const response = await client.send(command);
    const objUrl = parse(
      `https://fullstackyukta.s3.ap-south-1.amazonaws.com/${fileName}`
    );
    return objUrl.href;
  } catch (err) {
    console.error(err);
  }
};
