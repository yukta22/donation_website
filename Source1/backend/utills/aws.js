import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const createBucket = async () => {
  const command = new CreateBucketCommand({
    Bucket: "fullstackyukta",
  });

  try {
    const { Location } = await client.send(command);
    console.log(`Bucket created with location ${Location}`);
  } catch (err) {
    console.error(err);
  }
};

createBucket();
