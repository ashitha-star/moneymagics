import * as T from 'types';
declare class S3BucketUtility {
    /**
     * It will connect to AMAZON S3 bucket using region, accessKeyId, secretAccessKey & bucket provided in secret. <br/>
     * Once connection is ready, it will return client object. <br/>
     * If it is not able to make connection, it will throw error. <br/>
     */
    getS3ReadyClient(g: T.IAMGlobal): Promise<any>;
}
declare let temp: S3BucketUtility;
export = temp;