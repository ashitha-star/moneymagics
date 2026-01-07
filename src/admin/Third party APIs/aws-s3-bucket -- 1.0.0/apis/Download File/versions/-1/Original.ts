import * as T from 'types';
import { S3, GetObjectCommand } from '@aws-sdk/client-s3';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as stream from 'stream';

const unableToDownloadFileErr = 'Unable to download file';

async function readWriteStream(readableStream: NodeJS.ReadableStream) {
    return new Promise<string>((resolve, reject) => {

        //create random string
        const writeToFile = crypto.randomUUID();
        
        //file write @filepath
        const writeFilePath = path.join(__dirname, 'uploads', writeToFile);
        let writeStream = fs.createWriteStream(writeFilePath);
        stream.finished(readableStream, (err) => {
            if (err) {
                reject(err); //error throw
            } else {
                resolve(writeToFile); //writefile successfully
            }
        });
        readableStream.pipe(writeStream);
    });
}

async function main(g: T.IAMGlobal) {

    // connect with S3 client
    let c = await s3BucketUtility.getS3ReadyClient(g);

    try {

        //user input
        let bucketName = g.req.body.bucketName; // s3 bucket name
        let targetFileWithPath = g.req.body.targetFileWithPath; //  download filename with path
        let overrideFileName = g.req.body.overrideFileName; // override download filename
        

        //download file from a bucket
        let response = await c.send(new GetObjectCommand({
            Bucket: bucketName,
            Key: targetFileWithPath
        }));

        //get readable stream from response
        const readableStream = response.Body;

        //write file from readable stream
        let writeToFile = await readWriteStream(readableStream);

        return {
            __am__downloadFilePath: writeToFile, // save file into user system
            __am__downloadFolderFileName: overrideFileName || path.basename(targetFileWithPath)  // take download file name as it is if override file name not exist
        };
    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToDownloadFileErr,
            systemMessage: e.messages,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;