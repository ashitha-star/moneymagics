import * as T from 'types';
import { S3, DeleteBucketCommand } from '@aws-sdk/client-s3';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';


let unableToRemoveDirectoryErr = 'Unable to delete bucket';

async function main(g: T.IAMGlobal) {
    // connect with S3 client
    let c = await s3BucketUtility.getS3ReadyClient(g);

    try {

        //user input
        let bucketName = g.req.body.bucketName; // s3 bucket name

        //delete bucket @region
        const data: any = await c.send(new DeleteBucketCommand({
            Bucket: bucketName
        }));
        return data;

    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToRemoveDirectoryErr,
            systemMessage: e.messages,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;