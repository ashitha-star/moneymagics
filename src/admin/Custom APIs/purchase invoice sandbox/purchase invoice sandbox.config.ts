import * as T from 'types';
import { EType } from 'types';

let customApi: T.ICustomApiSettingsTypes = {
    name: 'purchase invoice sandbox',
    requestMethod: T.ERequestMethod.POST,
    path: '/purchase-invoice-sandbox',
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
    apiAccessType: T.EAPIAccessType.TOKEN_ACCESS,

    // No value = pickup authTokenInfo from default secret
    // Empty Array = Only AM authorization required because we are overriding default secret's authTokenInfo
    // authTokenInfo: <T.IAuthTokenInfo[]>[],

    fileUpload: {
        enable: true,
        allowFileUploadFields: [
            T.EFilesVariables.files,
        ],
        validations: {
        }
    },

    // runOnNativeProcess: true,
//     separateSandboxSettings: {
//         dockerFileOfSandbox: `
// FROM mcr.microsoft.com/playwright:v1.58.1-jammy

// WORKDIR /usr/src/app


// RUN npm install -g pnpm@10.27.0

// ARG A_DOCKERFILE_HASH

// ENV A_DOCKERFILE_HASH=\${A_DOCKERFILE_HASH}


// ARG A_PACKAGE_JSON_HASH

// ENV A_PACKAGE_JSON_HASH=\${A_PACKAGE_JSON_HASH}

// COPY ./package.json ./


// ARG A_CODE_HASH

// ENV A_CODE_HASH=\${A_CODE_HASH}


// ARG NODE_OPTIONS

// ENV NODE_OPTIONS=\${NODE_OPTIONS}

// COPY . .

// ARG A_NEW_PACKAGES_INSTALL_CMD

// ENV A_NEW_PACKAGES_INSTALL_CMD=\${A_NEW_PACKAGES_INSTALL_CMD}

// RUN \$A_NEW_PACKAGES_INSTALL_CMD


// EXPOSE 4631

// EXPOSE 4632

// EXPOSE 9229

// CMD [ "npm", "run", "start" ]`,
//         enableSeparateSandboxForThis: "sandbox_group_1",
//         packages: {
//             allowAllPackagesOfAdmin: false,
//             sandboxPackages: [
//                 { name: "playwright", version: "latest" }
//             ]
//         }
//     },

};
module.exports = customApi;