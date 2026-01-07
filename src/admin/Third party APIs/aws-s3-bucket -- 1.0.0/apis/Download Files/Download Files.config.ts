import { IApiSchema, ERequestMethod, EAPICategoryRedis, EApiRequestBodyType, HeadersPreBuilt } from 'store-types';
import * as ST from 'store-types';
import * as T from 'types';

let apiSchema: IApiSchema = {
    path: '/download-files',
    name: 'Download Files',
    requestMethod: ERequestMethod.POST,
    categoryRedis: EAPICategoryRedis.GET_DATA,
    reqBodySchema: {
        bucketName: <T.ISchemaProperty>{
            __type: T.EType.string,
            validations: {
                required: true
            }
        },
        targetFileWithPath: <T.ISchemaProperty>{
            __type: T.EType.string,
            validations: {
                required: true
            }
        },
        overrideFileName: <T.ISchemaProperty>{
            __type: T.EType.string,
            validations: {
            }
        }
    },
    reqQueryParametersSchema: {},
    errorList: [ // These errors will be listed in i18N so we can map it in different languages.
        'Unable to download file'
    ],

};
module.exports = apiSchema;