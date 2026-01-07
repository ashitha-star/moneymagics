import { IFileUploadSettings, ISchemaType, ISwaggerDocsObj } from './types';

export interface IApiSchema {
    name: string;
    path: string;
    requestMethod: ERequestMethod;
    categoryRedis: EAPICategoryRedis;

    headers?: ISupportedAPIParam[];
    autoAddHeaders?: boolean;
    queryParams?: ISupportedAPIParam[];
    autoAddQueryParams?: boolean;
    requestBodyTypeSupported?: EApiRequestBodyType[];
    reqBodySchema?: ISchemaType;
    reqQueryParametersSchema?: ISchemaType;
    errorList: string[];
    swaggerDocs?: ISwaggerDocsObj;
    fileUpload?: IFileUploadSettings;
}

export type IApiSchemaUI = Omit<IApiSchema, 'headers' | 'autoAddHeaders' | 'queryParams' | 'autoAddQueryParams' | 'requestBodyTypeSupported'>;

export interface ISupportedAPIParam {
    type: ESupportedAPIParamType;
    name: string;
    required: boolean;
    readonlyKey: boolean;
    readonlyValue: boolean;

    valueArr?: any[]; // to provide list for dropdown
    defaultValue?: any; // actual value
    value?: any,
    valueTemp?: any;
    nonRemovable?: boolean; // if it is true then it will not be removable from UI.

    // calculated UI properties
    isChecked?: boolean; // left side checkbox value
    id?: number; // left side checkbox value
}

export enum EAPICategoryRedis {
    GET_DATA = 'GET_DATA',
    MODIFY_DATA = 'MODIFY_DATA',
}

export enum EApiRequestBodyType {
    FORM_DATA = 'FORM_DATA',
    JSON = 'JSON',
    TEXT = 'TEXT',
}

export enum ERequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ESupportedAPIParamType {
    // input supported types
    text = 'text',
    number = 'number',

    // custom types
    secret = 'secret',
    am_authorization = 'am_authorization',
    user_authorization = 'user_authorization',

    aws_authorization = 'aws_authorization',
    google_authorization = 'google_authorization',
    azure_authorization = 'azure_authorization',

    i18n = 'i18n',
    boolean = 'boolean',
    dropdown = 'dropdown',
    file = 'file',
    files = 'files',
}

// if new entry added, please add in headers.json5 also.
// If new entry added. Need to set in getStatusCodeFromResponseString also.
// duplicate with types.ts
export enum EContentType {
    JSON = 'application/json',
    XML = 'text/xml',
    APPLICATION_XML = 'application/xml',
    YAML = 'text/yaml',
    TEXT = 'text/plain',
    HTML = 'text/html',
    OCTET_STREAM = 'application/octet-stream',
}

// keep all header values in lower case.
// find in considerHeadersInRedisKey = [ and adjust also
export enum EHeader {
    CONTENT_TYPE = 'content-type',
    ACCEPT_ENCODING = 'accept-encoding', // default br compression, identity = no compression, if accept-encoding header is not found br will be used. user can any of these values ['br', 'deflate', 'gzip', 'identity']
    NO_COMPRESSION_STD = 'x-no-compression', // standard compression header is supported by us.

    AUTHORIZATION_AM = 'x-am-authorization', // if API is not public then this token is mandatory.
    AUTHORIZATION_AM_USER = 'x-am-user-authorization', // used tor EAuthTokenType
    AUTHORIZATION_AWS = 'x-aws-authorization', // used tor EAuthTokenType
    AUTHORIZATION_GOOGLE = 'x-google-authorization', // used tor EAuthTokenType
    AUTHORIZATION_AZURE = 'x-azure-authorization', // used tor EAuthTokenType
    RUN_IN_SANDBOX = 'x-am-run-in-sandbox',

    ORIGIN = 'origin',
    AUTHORIZATION = 'authorization',
    META = 'x-am-meta', // true, false
    SECRET = 'x-am-secret',
    CONTENT_TYPE_RESPONSE = 'x-am-content-type-response', // EContentType
    CACHE_CONTROL = 'x-am-cache-control', // ECacheControl
    CODE_HASH = 'x-am-code-hash',
    SANDBOX_TIMEOUT = 'x-am-sandbox-timeout',
    GET_ENCRYPTED_DATA = 'x-am-get-encrypted-data', // EGetEncryptedData
    ENCRYPTED_PAYLOAD = 'x-am-encrypted-payload', // FE will send 'true' in it when payload is encrypted for transfer.
    RESPONSE_CASE = 'x-am-response-case', // EResponseCase
    RESPONSE_OBJECT_TYPE = 'x-am-response-object-type', // EResponseObjectType
    AM_I18N = 'x-am-internationalization', // user's I18N data

    // response headers
    DATA_SOURCE = 'x-am-data-source', // EDataSource // api, cache

    // not for end users.
    TEST_HOOK = 'x-am-test-hook', // while testing hook, send this as true so only that code will be executed and other hooks will not be executed.
    TEST_EVENT = 'x-am-test-event', // it will be sent from UI when user is testing event code.
    INTER_COMM = 'x-am-inter-comm', // Used between sandbox and process communication. It will have encrypted content.
    SEND_ONLY_OBJECTS = 'x-am-send-only-objects-in-stream', // used by sandbox API calls internally.
    AM_REQUEST_ID = 'x-am-request-id', // used to send requestId in response headers and internal calls can have same request Id.
    AM_CODE_EXEC_ID = 'x-am-code-exec-id', // It will be same for custom apis and db calls made inside that and same for schedulers, tp apis, ws code, initializers code etc.
    AM_STORE_TOKEN = 'x-am-store-token', // used to get data from store public APIs
    AM_WS_Client_ID = 'x-am-ws-client-id',
    RUN_IN_DEBUGGER = 'x-am-run-in-debugger', // Used to run code in debugger sandbox
    TENANT_USERNAME = 'x-am-tenant-username', // Used in multi tenant architecture, if passed, no need to pass specifically in APIs for manipulating that tenant specific data.
    TENANT_SECRET_PATH = 'x-am-tenant-secret-path', // Used in multi tenant architecture, if passed, no need to pass specifically in APIs for manipulating that tenant specific data.
}

export enum EHeaderDBMasters {
    DB_MASTER_NAME = 'db-master-name',
    ADMIN_PATH = 'admin-path',
}

export enum ECacheControl {
    reset_cache = 'reset_cache',
    no_action = 'no_action',
}

// Duplicate with types.ts
export enum EDataSource {
    api = 'api',
    cache = 'cache',
}

export enum EGetEncryptedData {
    no_encryption = 'no_encryption',
    get_only_encryption = 'get_only_encryption',
    get_data_and_encryption = 'get_data_and_encryption',
}

export enum EResponseCase {
    noChange = 'noChange', // default, do not change user response
    camelCase = 'camelCase',
    capitalCase = 'capitalCase',
    constantCase = 'constantCase',
    dotCase = 'dotCase',
    headerCase = 'headerCase',
    noCase = 'noCase',
    paramCase = 'paramCase',
    pascalCase = 'pascalCase',
    pathCase = 'pathCase',
    sentenceCase = 'sentenceCase',
    snakeCase = 'snakeCase',
}

export enum EResponseObjectType {
    no_action = 'no_action',
    make_flat = 'make_flat',
}
