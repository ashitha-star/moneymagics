import * as T from 'types';
import { S3, DeleteObjectCommand } from '@aws-sdk/client-s3';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';

const unableToDeleteFileErr = 'Unable to delete file';

async function main(g: T.IAMGlobal) {

    // connect with S3 client
    let c = await s3BucketUtility.getS3ReadyClient(g);

    try {
        //user input
        let bucketName = g.req.body.bucketName; // s3 bucket name
        let targetFileWithPath = g.req.body.targetFileWithPath; //  download filename with path
        
        //Delete file from a bucket
        let response =await c.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: targetFileWithPath
        }));
        return response;
    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToDeleteFileErr,
            systemMessage: e.message,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;