import * as T from 'types';

// Remove properties which you want to apply from parent level
let instanceColSetting: T.IInstanceApiSettingsTypes = {
    enableCaching: false, // need to provide external redis settings from root user.
    acceptOnlyEncryptedData: false,
    apiAccessType: T.EAPIAccessType.TOKEN_ACCESS,

    authTokenInfo: <T.IAuthTokenInfo[]>[
        {
            "authTokenType": "AM_DB",
            "authTokenAMDB": {
                "instance": 'test1',
                "database": 'moneymagics_db',
                "collection": 'users',
                "usernameColumn": 'name',
                "passwordColumn": 'password'
            }
        }
    ]
    
    // No value = pickup authTokenInfo from default secret 
    // Empty Array = Only AM authorization required because we are overriding default secret's authTokenInfo
    // authTokenInfo: <T.IAuthTokenInfo[]>[],

};
module.exports = instanceColSetting;