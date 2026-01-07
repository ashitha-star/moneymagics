import { IApiSchema, ERequestMethod, EAPICategoryRedis, EApiRequestBodyType, HeadersPreBuilt } from 'store-types';
import * as ST from 'store-types';
import * as T from 'types';

let apiSchema: IApiSchema = {
    path: '/upload-file',
    name: 'Upload File',
    requestMethod: ERequestMethod.POST,
    categoryRedis: EAPICategoryRedis.GET_DATA,
    reqBodySchema: {
        // targetFolderWithPath: <T.ISchemaProperty>{
        //     __type: T.EType.string,
        //     validations: {
        //         required: true
        //     }
        // },
        // bucketName: <T.ISchemaProperty>{
        //     __type: T.EType.string,
        //     validations: {
        //         required: true
        //     }
        // }
    },
    reqQueryParametersSchema: {},
    errorList: [ // These errors will be listed in i18N so we can map it in different languages.
        'Unable to upload file'
    ],

};
module.exports = apiSchema;