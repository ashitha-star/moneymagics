import * as T from 'types';
import { ListObjectsCommand } from '@aws-sdk/client-s3';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';

const unableToListFileErr = 'Unable to list file';

async function main(g: T.IAMGlobal) {

    // connect with S3 client
    let c = await s3BucketUtility.getS3ReadyClient(g);

    try {
        //user input
        let bucketName = g.req.body.bucketName; // s3 bucket name

        //Get list of objects from a bucket
        return await c.send(new ListObjectsCommand({
            Bucket: bucketName
        }));
    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToListFileErr,
            systemMessage: e.message,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;