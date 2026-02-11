import * as T from 'types';
import { EType } from 'types';

let customApi: T.ICustomApiSettingsTypes = {
    name: 'products',
    requestMethod: T.ERequestMethod.POST,
    path: '/products',
    enableCaching: false, // need to provide external redis settings from root user.
    resetCacheOnModificationOf: [
        // 'DB: instance_name:database_name:collection|table', // If modify|delete data of this collection|table system will automatically reset cache of this [Hello World] API.
        // 'TP: api_bundle_name:api_version', // If we hit any API of this version having [categoryRedis: EAPICategoryRedis.MODIFY_DATA], it will reset cache of this [Hello World] API.
        // 'CA: custom_api_name', // if we hit this custom_api, it will reset cache of this [Hello World] API.
    ],
    acceptOnlyEncryptedData: false,
    errorList: [ // These errors will be listed in i18N so we can map it in different languages.
        // 'Unable to process this request',
    ],
    apiAccessType: T.EAPIAccessType.IS_PUBLIC,
    
    // No value = pickup authTokenInfo from default secret
    // Empty Array = Only AM authorization required because we are overriding default secret's authTokenInfo
    // authTokenInfo: <T.IAuthTokenInfo[]>[],
    
    fileUpload: {
        enable: false,
        allowFileUploadFields: [
            T.EFilesVariables.files,
        ],
        validations: {
        }
    },
    // reqBodySchema: {
    //     name: {
    //         __type: EType.string,
    //         validations: {
    //             required: true,
    //         }
    //     },
    //     quantity: {
    //         __type: EType.number,
    //         validations: {
    //             required: true,
    //         }
    //     },
    //     cost_price: {
    //         __type: EType.number,
    //         validations: {
    //             required: true,
    //         }
    //     },
    //     selling_price:{
    //         __type: EType.number,
    //         validations: {
    //             required: true,
    //         }
    //     },
    //     raw_material_id:{
    //         __type: EType.number,
    //         validations: {
    //             required: true,
    //         }
    //     },
    //     quantity_used:{
    //         __type: EType.number,
    //         validations: {
    //             required: true,
    //         }
    //     }
    //     }

};
module.exports = customApi;