import { IApiSchema, ERequestMethod, EAPICategoryRedis, EApiRequestBodyType, HeadersPreBuilt } from 'store-types';
import * as ST from 'store-types';
import * as T from 'types';

let apiSchema: IApiSchema = {
    path: '/get-location-of-bucket',
    name: 'Get Location Of Bucket',
    requestMethod: ERequestMethod.POST,
    categoryRedis: EAPICategoryRedis.GET_DATA,
    reqBodySchema: {
        bucketName: <T.ISchemaProperty>{
            __type: T.EType.string,
            validations: {
                required: true
            }
        }
    },
    reqQueryParametersSchema: {},
    errorList: [ // These errors will be listed in i18N so we can map it in different languages.
        'Unable to get bucket location'
    ],

};
module.exports = apiSchema;