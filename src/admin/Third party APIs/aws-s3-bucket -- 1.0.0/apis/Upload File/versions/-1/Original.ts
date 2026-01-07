import * as T from 'types';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import * as path from 'path';
import * as fs from 'fs';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';

const sourceDirectoryFolderName = 'uploads'; // do not change it.
const unableToUploadFileErr = 'Unable to upload file';

async function uploadFile(c: S3, bucketName: string, key: string, fileStream: fs.ReadStream) {

    //Upload file to a bucket
    return await c.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileStream
    }));
}


// iterate files and upload them one by one.
async function uploadFileToAWSS3(g: T.IAMGlobal, c: S3) {

    //user input
    let bucketName = g.req.body.bucketName; // s3 bucket name
    let uploadFilesArray = g.req.body.files;
    let targetFolderWithPath = g.req.body.targetFolderWithPath; // s3 bucket folder name, where to upload

    //upload turn by turn
    for (let i = 0; i < uploadFilesArray.length; i++) {

        //create key        
        const fileName = uploadFilesArray[i].filename;
        const originalfileName = uploadFilesArray[i].originalname;
        let key = `${targetFolderWithPath}/${originalfileName}`;

        //create read steam of selected file
        const filePath = path.join(__dirname, sourceDirectoryFolderName, fileName);
        const fileStream = fs.createReadStream(filePath);

        // below will upload file to S3 bucket.
        await uploadFile(c, bucketName, key, fileStream);
    }
    return "File uploaded successfully";
}

async function main(g: T.IAMGlobal) {
    try {
        // connect with S3 client
        let c = await s3BucketUtility.getS3ReadyClient(g);

        // upload files to s3 and get respone
        let response = await uploadFileToAWSS3(g, c);
        return response;
    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToUploadFileErr,
            systemMessage: e.message,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;