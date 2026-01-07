import * as T from 'types';
import { S3 } from '@aws-sdk/client-s3';

class S3BucketUtility {

    /**
     * It will connect to AMAZON S3 bucket using region, accessKeyId, secretAccessKey & bucket provided in secret. <br/>
     * Once connection is ready, it will return client object. <br/>
     * If it is not able to make connection, it will throw error. <br/>
     */
    async getS3ReadyClient(g: T.IAMGlobal) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let fullSecretObj = await g.sys.system.getSecret();
                g.logger.log(fullSecretObj);
                const client = new S3({
                    region: fullSecretObj.region,
                    credentials: {
                        accessKeyId: fullSecretObj.accessKeyId,
                        secretAccessKey: fullSecretObj.secretAccessKey
                    }
                });
                resolve(client);
            } catch (e) {
                reject(e);
            }
        });
    }
}

let temp = new S3BucketUtility();
export = temp;