
import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createHash } from 'crypto';
import dotenv from "dotenv";
dotenv.config();

const accountId = process.env.S3_ACCOUNT_ID || "8446cebef141ec4a9db3a09fbfced7d2"
const accessKeyId = process.env.S3_ACCESS_KEY_ID || "bdb735c8f4c0561addbcf664a3a2b700"
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || "0d58860a4a7db25c84ec921ad3d734c01c14f8f011a7ae615e6faa16549da07d"

export const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export async function listBuckets(): Promise<string[]> {
    const response = await S3.send(new ListBucketsCommand(""));
    const bucketList = response.Buckets?.map((bucket) => bucket.Name!);
    return bucketList ?? [];
}

export async function calculateJSONHash(jsonObj: any, algorithm: string): Promise<string> {
    const jsonString = JSON.stringify(jsonObj);
    const hash = createHash(algorithm).update(jsonString);
    const hashHex = hash.digest('hex');
    return hashHex;
}

export async function writeJSONToFile(
    bucketName: string,
    userName: string,
    jsonObject: any
): Promise<void> {
    const hash = await calculateJSONHash(jsonObject, 'SHA-256');
    const jsonContent = JSON.stringify(jsonObject);
    const params = {
        Bucket: bucketName,
        Key: `${userName}/${hash}.json`,
        Body: jsonContent,
        ContentType: "application/json",
    };

    await S3.send(new PutObjectCommand(params));
    console.log(`JSON object written to ${userName}/${hash}.json in bucket ${bucketName}`);
}

export async function loadJSONFromFile(
    bucketName: string,
    userName: string,
    fileName: string
): Promise<object> {
    const params = {
        Bucket: bucketName,
        Key: `${userName}/${fileName}.json`,
    };

    const response = await S3.send(new GetObjectCommand(params));
    const body = await response.Body?.transformToString();
    const jsonObject = JSON.parse(body!);
    return jsonObject;
}

export async function deleteFile(
    bucketName: string,
    userName: string,
    fileName: string
): Promise<void> {
    const params = {
        Bucket: bucketName,
        Key: `${userName}/${fileName}.json`,
    };

    await S3.send(new DeleteObjectCommand(params));
    console.log(`Deleted  ${userName}/${fileName}.json from bucket ${bucketName}`);
}

export async function listJSONFiles(bucketName: string, userName: string): Promise<(string | undefined)[] | undefined> {
    const params = {
        Bucket: bucketName,
        Delimiter: "/",
        Prefix: `${userName}/`,
        StartAfter: "",
    };

    const response = await S3.send(new ListObjectsV2Command(params));
    const jsonFiles = response.Contents?.filter((obj) => obj.Key!.endsWith(".json"));
    console.log(`JSON files in ${bucketName}:`);
    const fileNames = jsonFiles?.map((file) => {
        return file.Key!.split("/").pop();
    });
    return fileNames;
}