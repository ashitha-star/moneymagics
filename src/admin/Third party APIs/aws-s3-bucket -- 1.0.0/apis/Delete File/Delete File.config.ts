import { IApiSchema, ERequestMethod, EAPICategoryRedis, EApiRequestBodyType, HeadersPreBuilt } from 'store-types';
import * as ST from 'store-types';
import * as T from 'types';

let apiSchema: IApiSchema = {
    path: '/delete-file',
    name: 'Delete File',
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
        }
    },
    reqQueryParametersSchema: {},
    errorList: [
        'Unable to delete file'
    ]

};
module.exports = apiSchema;