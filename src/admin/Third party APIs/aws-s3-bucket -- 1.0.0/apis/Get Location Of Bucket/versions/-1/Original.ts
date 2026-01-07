import * as T from 'types';
import * as s3BucketUtility from 'utils/aws-s3-bucket/1.0.0/S3BucketUtility';


let unableToGetBucketLocationErr = 'Unable to get bucket location';

async function main(g: T.IAMGlobal) {
    // connect with S3 client
    let c = await s3BucketUtility.getS3ReadyClient(g);

    try {

        //user input
        let bucketName = g.req.body.bucketName; // s3 bucket name

        //get bucket location @ which region
        let bucketLocation = await c.getBucketLocation({
            Bucket: bucketName,
        });
        return bucketLocation.LocationConstraint;
    } catch (e) {
        throw [<T.IResponseError>{
            message: unableToGetBucketLocationErr,
            systemMessage: e.messages,
            field: g.req.body.bucketName,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack,
            value: e,
        }];
    }
};
module.exports = main;