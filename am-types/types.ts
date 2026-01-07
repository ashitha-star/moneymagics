export interface IAMGlobal {
    req: IAMGlobalRequest;
    res: IAMGlobalResponse;
    sys: IAMGlobalSys;
    logger: IAMGlobalLogger;
    shared: any;
}

export interface IAMGlobalLogger {
    debug(...data: any[]): void;
    log(...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
}

export interface IAMGlobalRequest {
    headers: any;
    params: IBaseParams;
    query: any;
    body: any;
    eventData: any;
    auth: ISandboxReqAuthObj;
    reqInfo: IRequestInfo;

    /** It will be true, when request is coming from actual end user and not from internal code like custom API or not from AM UI. */
    isApiRequestFromUser?: boolean;
}

export interface ISandboxReqAuthObj {
    authAMUser?: any;
    authAMDB?: any;

    authGoogle?: any;
    authAWS?: any;
    authAzure?: any;
}

export interface IRequestInfo {
    url: string;
    apiCategory: EAPICategoryEnum;
    apiInfo: {
        schemaType: 'SCHEMA' | 'GEN',
        id: EAPIIdEnum;
        name: string;
        url: string;
    };
    reqMethod?: ERequestMethod;
}

export enum EAPICategoryEnum {
    INSTANCES = 'INSTANCES',
    THIRD_PARTY_APIS = 'THIRD_PARTY_APIS',
    CUSTOM_APIS = 'CUSTOM_APIS',
    SYSTEM_APIS = 'SYSTEM_APIS',
    EVENTS = 'EVENTS',
    SCHEDULERS = 'SCHEDULERS',
    MIGRATION_SCRIPT = 'MIGRATION_SCRIPT',
    WEB_SOCKET_EVENT_CAN_USER_CONNECT_CODE = 'WEB_SOCKET_EVENT_CAN_USER_CONNECT_CODE',
    PROCESS_INITIALIZER = 'PROCESS_INITIALIZER',
    UTILITY_CLASS = 'UTILITY_CLASS',
}

export enum EAPIIdEnum {
    // Schema APIs
    SCHEMA_GET_ALL = 'SCHEMA_GET_ALL',
    SCHEMA_GET_ALL_STREAM = 'SCHEMA_GET_ALL_STREAM',
    SCHEMA_GET_BY_ID = 'SCHEMA_GET_BY_ID',
    SCHEMA_POST_BULK_INSERT = 'SCHEMA_POST_BULK_INSERT',
    SCHEMA_MASTER_SAVE = 'SCHEMA_MASTER_SAVE',
    SCHEMA_ARRAY_OPERATIONS = 'SCHEMA_ARRAY_OPERATIONS',
    SCHEMA_UPDATE_MANY = 'SCHEMA_UPDATE_MANY',
    SCHEMA_PUT_UPDATE_BY_ID = 'SCHEMA_PUT_UPDATE_BY_ID',
    SCHEMA_PUT_REPLACE_BY_ID = 'SCHEMA_PUT_REPLACE_BY_ID',
    SCHEMA_DEL_DELETE_BY_ID = 'SCHEMA_DEL_DELETE_BY_ID',
    SCHEMA_POST_QUERY = 'SCHEMA_POST_QUERY',
    SCHEMA_POST_QUERY_STREAM = 'SCHEMA_POST_QUERY_STREAM',
    SCHEMA_POST_QUERY_DELETE = 'SCHEMA_POST_QUERY_DELETE',
    SCHEMA_POST_AGGREGATE = 'SCHEMA_POST_AGGREGATE',
    SCHEMA_POST_COUNT = 'SCHEMA_POST_COUNT',
    SCHEMA_GET_DISTINCT = 'SCHEMA_GET_DISTINCT',
    SCHEMA_POST_DISTINCT_QUERY = 'SCHEMA_POST_DISTINCT_QUERY',

    // GEN APIs
    GEN_GET_ALL = 'GEN_GET_ALL',
    GEN_GET_ALL_STREAM = 'GEN_GET_ALL_STREAM',
    GEN_GET_BY_ID = 'GEN_GET_BY_ID',
    GEN_POST_BULK_INSERT = 'GEN_POST_BULK_INSERT',
    GEN_MASTER_SAVE = 'GEN_MASTER_SAVE',
    GEN_ARRAY_OPERATIONS = 'GEN_ARRAY_OPERATIONS',
    GEN_UPDATE_MANY = 'GEN_UPDATE_MANY',
    GEN_PUT_UPDATE_BY_ID = 'GEN_PUT_UPDATE_BY_ID',
    GEN_PUT_REPLACE_BY_ID = 'GEN_PUT_REPLACE_BY_ID',
    GEN_DEL_DELETE_BY_ID = 'GEN_DEL_DELETE_BY_ID',
    GEN_POST_QUERY = 'GEN_POST_QUERY',
    GEN_POST_QUERY_STREAM = 'GEN_POST_QUERY_STREAM',
    GEN_POST_QUERY_DELETE = 'GEN_POST_QUERY_DELETE',
    GEN_POST_AGGREGATE = 'GEN_POST_AGGREGATE',
    GEN_POST_COUNT = 'GEN_POST_COUNT',
    GEN_GET_DISTINCT = 'GEN_GET_DISTINCT',
    GEN_POST_DISTINCT_QUERY = 'GEN_POST_DISTINCT_QUERY',

    // System APIs
    EXECUTE_PLAIN_QUERY = 'EXECUTE_PLAIN_QUERY',
    ENCRYPT_DATA = 'ENCRYPT_DATA',
    DECRYPT_DATA = 'DECRYPT_DATA',
    HASH_DATA = 'HASH_DATA',
    GET_TOKEN = 'GET_TOKEN',
    CALL_EXTERNAL_API = 'CALL_EXTERNAL_API',
    GET_SECRET = 'GET_SECRET',

    GET_REDIS_KEY = 'GET_REDIS_KEY',
    SET_REDIS_KEY = 'SET_REDIS_KEY',
    REMOVE_REDIS_KEY = 'REMOVE_REDIS_KEY',
    CUSTOM_USER_CACHING = 'CUSTOM_USER_CACHING', // it is used for CRUD of user keys from system API.

    RESET_REDIS_CACHE_DB = 'RESET_REDIS_CACHE_DB',
    RESET_REDIS_CACHE_CUSTOM_APIS = 'RESET_REDIS_CACHE_CUSTOM_APIS',
    RESET_REDIS_CACHE_SYSTEM_APIS = 'RESET_REDIS_CACHE_SYSTEM_APIS',
    RESET_REDIS_CACHE_TP_APIS = 'RESET_REDIS_CACHE_TP_APIS',
    GET_TABLE_META = 'GET_TABLE_META',
    EMIT_EVENT = 'EMIT_EVENT',
    EMIT_EVENT_WS = 'EMIT_EVENT_WS',

    IS_VALID_DATA_FOR_TABLE = 'IS_VALID_DATA_FOR_TABLE',
    IS_VALID_DATA_FOR_CUSTOM_API = 'IS_VALID_DATA_FOR_CUSTOM_API',
    IS_VALID_DATA_FOR_THIRD_PARTY_API = 'IS_VALID_DATA_FOR_THIRD_PARTY_API',

    MULTI_TENANT_INSTANCE_UPDATED = 'MULTI_TENANT_INSTANCE_UPDATED',
    IS_VALID_CONNECTION_STRING = 'IS_VALID_CONNECTION_STRING',
}

export interface IAuthInfoObjects {
    authAMDBInfo?: IAuthTokenAMDB; //
    authAMDBGroups?: any[]; // IGroup[]

    authGoogleInfo?: IAuthTokenGoogle;
    authGoogleGroups?: any[]; // IGroup[]
    authAWSInfo?: IAuthTokenAWS;
    authAWSGroups?: any[]; // IGroup[]
    authAzureInfo?: IAuthTokenAzureAD;
    authAzureGroups?: any[]; // IGroup[]
}

// duplicate with store-types
export enum EContentType {
    JSON = 'application/json',
    XML = 'text/xml',
    YAML = 'text/yaml',
    TEXT = 'text/plain',
    HTML = 'text/html',
    OCTET_STREAM = 'application/octet-stream',
}

// duplicate with store-types
export enum ERequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IBaseParams {
    apiPath?: string;
    reqMethod?: ERequestMethod;

    // instance apis
    instanceName?: string;

    /** Do not use this field. Use dbEnvironment | dbUser */
    database?: string;
    collection?: string;
    column?: string;
    id?: any;
    primaryKey?: any;

    // instance apis -> distinct api params
    field?: string;
    order?: string;

    // third party
    apiBundleName?: string;
    apiVersionName?: string;
    apiName?: string;
    apiCodePath?: string;

    // swagger
    swaggerToken?: string;

    // calculated fields from database field
    /** database name given by user and it will be converted to masked database. ex: inventory_db */
    dbEnvironment?: string;

    /** Actual database name on which operation is getting performed. ex: inventory_db_dev_1 */
    dbUser?: string;

    /**
     * If true, it will not throw cycle error.
     */
    noCycle?: boolean;

    /**
     * Default is true, If true, it will skip pre hook & post hook running.
     * It will be made true from code of custom API
     */
    skipHookRunning?: boolean;

    /** Default true, if true, it will allow update by id & replace by id & master save without version field and it will not throw error when version is different. */
    skipConcurrencyControl?: boolean;

    /**
     * It is used in instance & database & collection hooks
     */
    hookType?: 'pre' | 'post';

    // Multi tenant architecture related internal fields.
    tenantUsername?: string;
    tenantSecretPath?: string;
}

export interface IAMGlobalResponse {
    /** Status code of response. ex: 401, 500 */
    statusCode?: EStatusCode;

    /** Change content-type header of response. default is 'application/json' */
    contentType?: EContentType;

    /** It will be sent to user as response of api call. */
    output?: any;

    /** Shared object for user to use. */
    shared?: any;

    /** * List of errors. If any error occurs. It will be returned to user. */
    errors?: IResponseError[];

    /** List of errors. If any error occurs. It will be returned to user. */
    warnings?: IResponseError[];

    /** Set value of headers for response. */
    headers?: any;
}

export interface IMultiTenantSecretObj {
    instanceName: string;
    databaseName: string;
    collectionName: string;
    usernameColumn: string;
    connectionStringColumn: string;

    // Oracle database fields.
    oracleDBUsernameColumn?: string;
    oracleDBPasswordColumn?: string;
    oracleDBPrivilegeColumn?: string;

    find: any;
}

export enum EType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    date = 'date',
    objectId = 'objectId',

    // below are added because of third party request body
    file = 'file',
    files = 'files'
}

export enum EErrorType {
    required = 'required',
    min = 'min',
    max = 'max',
    minLength = 'minLength',
    maxLength = 'maxLength',
    unique = 'unique',
    uniqueCombination = 'uniqueCombination', // multiple keys unique violated
    invalidValue = 'invalidValue',
    schemaKeyNotFound = 'schemaKeyNotFound',
    schemaNotFound = 'schemaNotFound',
    emailNotValid = 'emailNotValid',
    enumValidation = 'enumValidation',
    virtualFieldUsedInFind = 'virtualFieldUsedInFind',
}

// Main interfaces
export interface ISchemaType {
    [key: string]: IAnySchemaPropertyType;
}

export interface ISchemaTypeCustomApi {
    [key: string]: IAnySchemaPropertyTypeCustomApi;
}

export type IAnySchemaPropertyType = EType | [EType] | ISchemaProperty | [ISchemaProperty] | ISchemaType | [ISchemaType];
export type IAnySchemaPropertyTypeCustomApi = EType | [EType] | ISchemaPropertyCustomApi | [ISchemaPropertyCustomApi] | ISchemaTypeCustomApi | [ISchemaTypeCustomApi];

export interface ISchemaProperty { // Add new schema property in ValidateDBSchema too
    __type?: EType;
    conversions?: IPropertyConversion;
    validations?: IPropertyValidation;

    /**
     * These settings are only available only for UI Maker extension. It will have no impact when UI Maker is not installed in your installation.<br/><br/>
     * When we try to generate default JSON for collection from UI Maker, these settings will be merged with default JSON generation.<br/>
     * These settings are only used to generate UI Maker code, it has no runtime effect.<br/>
     *
     * After generating default code for UI Maker page, system will use these settings and override those configurations.
     * */
    uim?: IDBMasterConfigFormField;

    instance?: string; // used as strings in _.get
    database?: string; // used as strings in _.get
    collection?: string; // used as strings in _.get
    table?: string;

    /**
     * user can define column of target collection here. so no need to define t_key in deep property.
     * this column value will be return after nested save.
     * */
    column?: string;

    /**
     * Used in virtual field deep populate.<br/>
     * Current table's which column is used to generate this virtual field.
     * */
    s_columnVirtualLinker?: string;

    /**
     * Used for columns where isVirtualField is true.
     * Need to place column name of target table which holds primary key value of this table.
     * It is optional when target table has only one column, in which `collection/table` value is this collection/table name.
     * */
    t_columnVirtualLinker?: string;

    isPrimaryKey?: boolean;

    /** Database will take care of assigning incremental value for this field. */
    isAutoIncrementByDB?: boolean;

    /**
     * API Maker will take care of assigning incremental value for this field.<br/>
     * if isAutoIncrementByDB is true then isAutoIncrementByAM & isAutoGenerateByAM will have no effect.
     * */
    isAutoIncrementByAM?: boolean | IIsAutoIncrementByAM;

    /**
     * API Maker will generate random values for this field based on configuration. When value is provided then it will not generate.<br/>
     * isAutoGenerateByAM has higher priority over isAutoIncrementByAM.<br/>
     * if isAutoIncrementByDB is true then isAutoIncrementByAM & isAutoGenerateByAM will have no effect.
     * */
    isAutoGenerateByAM?: IIsAutoGenerateByAM;

    /**
     * if true, system will fail update/replace operation when value of this field in request payload, and value of database is not same.<br/>
     * Sending this field in update request is mandatory.<br/>
     * We can use conversions -> conversionFun to generate it's values.<br/>
     * This will not work for SCHEMA_UPDATE_MANY API because it is direct query on database for updating multiple rows.<br/>
     * By using optimistic concurrency control, you can ensure that updates are not overwritten by concurrent modifications, maintaining data integrity.<br/>
     * */
    isConcurrencyControlField?: boolean;

    /**
     * If true, means it is not actual field in database and just field in schema.
     * Means we want it to use in deep populate and master save to get & store data in one API call.
     * */
    isVirtualField?: boolean;
}

export type ISchemaPropertyCustomApi = Pick<ISchemaProperty, '__type' | 'conversions' | 'validations'>;

export interface IIsAutoIncrementByAM {
    start: number;
    step?: number; // default value will be 1
}

export interface IIsAutoGenerateByAM {
    valueGeneratorType: EValueGeneratorType;
}

export enum EValueGeneratorType {
    GUID_UUID = 'GUID_UUID',
    ObjectID = 'ObjectID',
    ULID = 'ULID',
    ShortUUID = 'ShortUUID',
}

export interface IPropertyConversion {
    trimStart?: boolean;
    trimEnd?: boolean;
    trim?: boolean;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    conversionFun?: Function;

    /**
     * When we are tying to save/replace and property is not present in payload, this default value will be applied to it.<br/>
     * This default value will be converted to that type and applied.<br/>
     * Empty string and null values will be treated based on configuration.
     * */
    defaults?: IPropertyConversionDefaults;

    /** enable encryption for this property */
    encryption?: boolean | IEncryptionDescription;

    /** enable description for this property */
    // decryption?: boolean | IEncryptionDescription;

    /** enable hashing for this property */
    hashing?: boolean | IPropertyHashing;
}

export interface IPropertyConversionDefaults {
    /** This default value will converted to type and applied. */
    defaultValue?: any;

    /** defaultValue has higher priority compare to defaultFun. If defaultValue is not present, system will execution this function and returned value will be set. */
    defaultFun?: Function;

    /** If true, it will apply default value when value is also null. */
    shouldReplaceNullWithDefault?: boolean;

    /** If true, it will apply default value when value is also empty string. */
    shouldReplaceEmptyStringWithDefault?: boolean;
}

export enum EIPropertyConversionDefaults {
    defaultValue = 'defaultValue',
    defaultFun = 'defaultFun',
}

export interface IEncryptionDescription {
    /** by default is DB for encryption and User for decryption. value will be encrypted while sending to DB | User */
    sendingTo?: ESendingToSchema;

    /** algorithm path within secret object. default: common.encryptionAlgorithm */
    encryptionAlgorithm?: string;

    /** secret path within secret object. default: common.secret */
    secret?: string;

    /** nonce path within secret object. default: common.nonce, common.secret */
    nonce?: string;
}

export interface IPropertyHashing {

    /** by default is DB for encryption and User for decryption. value will be encrypted while sending to DB | User */
    sendingTo?: ESendingToSchema;

    /** algorithm path within secret object. default: common.hashingAlgorithm */
    hashingAlgorithm?: string;

    /** secret path within secret object. default: common.secret */
    secret?: string;
}

export enum ESendingToSchema {
    DB = 'DB',
    USER = 'USER',
}

export interface IDownloadResponse {
    __am__downloadFolderFileName?: string; // ex: hello.txt // override file name for download
    __am__downloadFilePath?: string; // my.zip | hello.txt // mostly it should be random number // give original file name which we created in uploads folder.
    __am__downloadFileOrFolderPaths?: string | string[] | { fsSource: string; archiveDestination: string }[];
    __am__cleanupFileOrFolderPaths?: string | string[]; // once file or zip sent to user, remove these files/folders from uploads directory.
}

export enum ESpecialParamKeyNames {
    path = 'path', // it will be used in file upload or download in ftp/s3/azure and engine will try to fetch file name with extension to throw for download with name & extension
}

// Below interface is used in Secret Management.
export interface ISecretType {
    common?: ISecretTypeCommon; // it is general purpose secret key section.
}

export interface ISecretTypeCommon extends Pick<IAuthTokenInfoCommon, 'authTokenInfo'> {
    hashingAlgorithm?: 'SHA256'; // change in IPropertyHashing also
    nonce?: string; // if it is available, it will be used for hashing, if not available secret will be used for hashing

    encryptionAlgorithm?: 'AES' | 'RC4' | 'TRIPLEDES'; // encryptionAlgorithm  // encryptionAlgorithmDBPersist
    secret?: string; // secret // secretDBPersist

    encryptionAlgorithmFETransfer?: 'AES' | 'RC4' | 'TRIPLEDES'; // encryption algo used to decrypt data sent by FE.
    secretFETransfer?: string; // secret used to decrypt data sent by FE.
    feTransferDataValidityInSeconds?: number; // to validate value of createdAt // to (now - createdAt) > this value, means payload is invalid.

    connectionString: {
        mongodb?: string;
        mysql?: string;
        mariadb?: string;
        sqlServer?: string;
        postgreSQL?: string;
        oracle?: string;
    };
}

export interface IAuthTokenInfo {
    authTokenType?: EAuthTokenType;
    authTokenAM?: IAuthTokenAM | IRefreshTokenAM;
    authTokenAMDB?: IAuthTokenAMDB | IRefreshTokenAM;

    authTokenAWS?: IAuthTokenAWS;
    authTokenAzureAD?: IAuthTokenAzureAD;
    authTokenGoogle?: IAuthTokenGoogle;
    testObj?: any;
}

export interface IAuthTokenAM {
    u: string;
    p: string;
}

export interface IRefreshTokenAM {
    refresh_token: string;
}

export interface IAuthTokenAMDB extends Partial<IAuthTokenAM> {
    instance?: string; // it will be instance name
    database?: string;
    collection?: string;
    table?: string;
    usernameColumn?: string;
    passwordColumn?: string;
    /** If you use this column, password field will not be present in JWT token and this value will be present, It is used to identify pass is changed or not. */
    passwordChangedAtColumn?: string;

    /** column name which holds values of, comma separated groups assigned to this db user. * = means all groups of api user. DB user can hit API if he/she has access in any of these groups. */
    groupsColumn?: string;
    countOfUsersForTesting?: number; // load these much users in dropdown.

    condition?: any;
    sortUsersForTesting?: any; // sorting condition for dropdown
    select?: any;

    __amDBRequestData?: string; // we will stringify request JSON and set in this field.
}

export interface IAuthTokenAWS extends IAuthTokenGroupsProperties {
    cognitoUserPoolId: string;
    region: string;
    tokenUse: 'access' | 'id'; // Possible Values: access | id
    tokenExpiration: number; // Up to default expiration of 1 hour (3600000 ms)
}

export interface IAuthTokenAzureAD extends IAuthTokenGroupsProperties {
    /** client_id */
    appId: string;
    tenant: string;

    audience: string;
    issuer: string;
    maxRetries: number;
}

export interface IAuthTokenGroupsProperties {
    sourceFieldOfUniqueId?: string;
    groupsDataSource?: {
        instance: string;
        database: string;
        collection?: string;
        table?: string;
        targetFieldForUniqueId: string;
        groupsColumn: string;
        select?: any;
    };
}

export interface IAuthTokenGoogle extends IAuthTokenGroupsProperties {
    clientId: string;
}

export interface IConnectionOptions {
    title: '', // title of the option
    text?: '', // description of the connection option
    sample?: '' // sample connection string of that option
}

export interface IResponseError {
    type?: EErrorType;
    field?: string;
    message?: string;
    action?: string; // we can give message in this to solve this error or issue.
    value?: any;
    code?: EStatusCode;
    systemMessage?: string;
    dataIndex?: number;
    stack?: any; // it might be present.
    apiCallSequence?: string[];
}

export enum EApiPaths {
    API = '/api',
    GEN = '/gen',
    SCHEMA = '/schema',
    THIRD_PARTY = '/third-party',
    THIRD_PARTY_STORE = '/third-party-store',
    CUSTOM_API = '/custom-api',
    SYSTEM_API = '/system-api',
    SITES = '/sites',

    // test--hook is hard coded in eval utils so please change that also if changing.
    TEST_HOOK = '/test--hook', // it is special url for custom api for hook to test hook code.
    ENCRYPT_DATA = '/encrypt-data',
    DECRYPT_DATA = '/decrypt-data',
    HASH_DATA = '/hash-data',
    GET_TOKEN = '/token',
    CALL_EXTERNAL_API = '/call-external-api',
    EXECUTE_PLAIN_QUERY = '/execute-plain-query', // it is special url for executing
    GET_SECRET_BY_NAME = '/get-secret-by-name', // it is special url for executing
    GET_REDIS_KEY = '/get-redis-key',
    SET_REDIS_KEY = '/set-redis-key',
    REMOVE_REDIS_KEY = '/remove-redis-key',
    RESET_REDIS_CACHE_DB = '/reset-redis-cache-db',
    RESET_REDIS_CACHE_CUSTOM_APIS = '/reset-redis-cache-custom-apis',
    RESET_REDIS_CACHE_SYSTEM_APIS = '/reset-redis-cache-system-apis',
    RESET_REDIS_CACHE_TP_APIS = '/reset-redis-cache-third-party-apis',

    GET_TABLE_META = '/get-table-meta', // get table meta data for sql databases in some common format.
    EMIT_EVENT = '/emit-event',
    EMIT_EVENT_WS = '/emit-event-ws',

    // validations
    IS_VALID_DATA_FOR_TABLE = '/is-valid-data-for-table',
    IS_VALID_DATA_FOR_CUSTOM_API = '/is-valid-data-for-custom-api',
    IS_VALID_DATA_FOR_THIRD_PARTY_API = '/is-valid-data-for-third-party-api',

    MULTI_TENANT_INSTANCE_UPDATED = '/multi-tenant-instance-updated',
    IS_VALID_CONNECTION_STRING = '/is-valid-connection-string',
}

export interface IQueryFormat {
    find?: any;
    find_join?: IFindJoinFormat[];
    sort?: any;
    skip?: number;
    limit?: number;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    set?: any; // It will be used for bulk update.
    groupBy?: any; // it is used in mysql query
    updateData?: any; // it is used in updateMany API
    getTotalCount?: boolean; // return total count if it's value is true.
    [key: string]: any;
}

export interface IApiParamsDeepFormat {
    s_key: string;
    /**
     * Used in virtual field deep populate.<br/>
     * Value of which key is used to compare with value of t_keyColumnVirtualLinker in target collection(t_col).
     * */
    s_keyColumnVirtualLinker?: string;

    // t_apiPath?: string;
    t_instance?: string;
    t_db?: string;
    t_col?: string;
    /** Primary key of target collection/table */
    t_key?: string;
    /** Column of target table which holds data to link to current table */
    t_keyColumnVirtualLinker?: string;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    select?: any;

    // below are additional feature properties newly added to give more flexibility in populate.
    isMultiple?: boolean;
    find?: any;
    sort?: any;

    // skip & limit can not be supported directly in query, because query is in query with all the ids of array.
    // We process skip & limit while setting multiple data.
    skip?: number;
    limit?: number;

    /**
     * Can be used for fields having `isVirtualField: true` in schema.
     * chunk = System will get data in chunks from database. It is default method with chunk size = 1000. <br/>
     * one_by_one = System will get nested data one by one for each object. It should be used when we are using limit & skip for target table and it has large amount of data.<br/>
     * */
    fetchingTechnique?: 'chunk' | 'one_by_one';

    /**
     * Can be used for fields having `isVirtualField: true` in schema.
     * */
    fetchingTechniqueSettings?: {
        /** Default : 1000 */
        chunkSize?: number;
    }
}

export interface IDeepFormat extends IApiParamsDeepFormat {
    // below is used in deep
    selectFromNextDeep?: any;
}

export interface IFindJoinFormat {
    t_instance?: string;
    t_db?: string;
    t_col: string;
    find: any;

    find_key_target?: string; // after find, put list of ids in this key of find // ex: address.country, address
    find_id_source?: string; // get ids from this source key instead of find property // ex: address.country
    sourceTablePrimaryKey?: string; // it will be present when user defines column in source/parent table schema. We will use it instead of child table primary key.
}

// It is used internally & for users also.
/**
 * Create array of this interface in schema.
 * It will be validated on every update/save
 */
export interface IDataValidation {
    name?: string;
    paths: string[];
    type: EDataValidationType;
    errorMessage?: string | any; // This string will be return to user if it is available.
}

export enum EDataValidationType {
    SUPER_KEY = 'SUPER_KEY', // this combination of keys should be unique, Make sure they are required field.
}

export enum EStatusCode {
    OK = 200,
    NO_CONTENT = 204, // do not use this because it will not send our data with null.
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403, // client is authenticated but doesn't have access plus CORS error
    RESOURCE_NOT_FOUND = 404, // convert 405(Method not allowed) in this 404.
    INTERNAL_SERVER_ERROR = 500,
}

export interface ICallApiFromBackend {
    url: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
    timeout?: number;
    body?: any;
    queryParams?: any;
    headers?: any;
    id?: string;
    preProcess?: ICallApiFromBackendDataProcess[];
    postProcess?: ICallApiFromBackendDataProcess[];
    output?: any;
}

export interface ICallApiFromBackendDataProcess {
    from?: string; // '1.resp.id'
    to?: string; // 'body.orderId'
}

export interface ICallApiFromBackendProcess {
    type: EApiCallType,
    data: ICallApiFromBackendProcess | ICallApiFromBackend[];
}

export enum EApiCallType {
    parallel = 'parallel',
    sequential = 'sequential',
}

export interface IArrayOperationBody {
    find: any;
    select?: any;
    operations: IArrayOperation[];
}

export interface IArrayOperation {
    operation?: EArrayOperation;
    path?: string;
    dataToPush?: any[]; // $push, used for push operation. Array/Object of data to push in array.
    queryToRemove?: any; // $pull, query to remove docs from array.
    dataToPull?: any[]; // $pullAll, array of items which will be removed from array.
    direction?: -1 | 1; // $pop, -1 remove first, 1 remove last.
    position?: number; // $push, used in push. If dataToPush is array we can use it with $each operator.
    slice?: number; // $push, must use with $each, used in push. positive = remove that much elements from front of array. negative = remove items from end of array
    sort?: number; // $push, must use with $each, used in push.
    dataToSet?: any; // object to be passed in $set operator
    arrayFilters?: any[]; // array of objects, to be used to filter array items and set values of $set operator.
    upsert?: boolean; // if value not found in $set operation it will insert new value there.
}

export interface IGetTokenResponse {
    token: string;
    refresh_token: string;
    expires_in: number; // in seconds
}

export interface IAuthTokenInfoCommon {
    apiAccessType?: EAPIAccessType; // api level setting
    authTokenInfo?: IAuthTokenInfo[] | string; // string will point to secret path.
}

export interface IInstanceApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

export type IInstanceApiSettingsTypesForAPI = Omit<IInstanceApiSettingsTypes, 'enableCaching'>;

export interface ITPApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    resetCacheOnModificationOf?: string[]; // ins.db.col | api_bundle.version
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

export type ITPApiSettingsTypesAPILevel = Omit<ITPApiSettingsTypes, 'enableCaching' | 'resetCacheOnModificationOf'>;

export interface ICustomApiSettingsTypes extends IAuthTokenInfoCommon {
    name: string;
    // label: string;
    path: string;
    requestMethod: ERequestMethod;
    enableCaching?: boolean; // collection level setting
    resetCacheOnModificationOf?: string[]; // ins.db.col | api_bundle.version
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting

    reqBodySchema?: ISchemaTypeCustomApi;
    reqQueryParametersSchema?: ISchemaTypeCustomApi;

    /**
     * - If true, code will execute on original Node.js process and not in sandbox.<br/>
     * - It makes code execution fast, Do not use it if you don't know what you are doing.<br/>
     * - Bad code can make entire server freeze and give weird behaviour.<br/>
     * - So, it can not use sandbox packages.<br/>
     * - It can use Node.js inbuilt packages.<br/>
     * - It can use packages from package.json of api_maker_be.<br/>
     * - You can use all features of global variable 'g'.<br/>
     */
    runOnNativeProcess?: boolean;

    /** list of all errors thrown by this API. */
    errorList: string[];
    swaggerDocs?: ISwaggerDocsObj;

    /** if runOnNativeProcess is true, these settings will have no effect. "Automatic Sandbox Restart In Seconds" will have no effect when this setting is provided. */
    separateSandboxSettings?: ISeparateSandboxSettings;

    fileUpload?: IFileUploadSettings;
}

export interface IFileUploadSettings {
    /** Default true, Allow file upload feature. */
    enable?: boolean;

    /** System will only allow file upload on these fields only. */
    allowFileUploadFields?: EFilesVariables[];

    validations?: {
        [key in EFilesVariables]?: IFileUploadSettingsValidations;
    }
}

export interface IFileUploadSettingsValidations {
    /** System will throw error if file size is less than given size */
    minFileSizeBytes?: number;
    /** System will throw error if file size is greater than given size */
    maxFileSizeBytes?: number;
    /** ex: ['.png', '.jpeg', '.jpg'] */
    allowedExtensionsArr?: string[];
}

export interface ISeparateSandboxSettings {
    /**
     * ex: Sandbox_Group_1, system will create separate sandbox for this particular entity and "Automatic Sandbox Restart In Seconds" will have no effect on this sandbox.
     * All the packages of custom APIs having value "Sandbox_Group_1" will be available during execution.
     * */
    enableSeparateSandboxForThis?: string;

    /**
     * If any "separateSandboxSettings" has value in this, it will be used instead of "Sandbox Settings" DockerFile
     * */
    dockerFileOfSandbox?: string;

    /** It works when we have enableSeparateSandboxForThis as true. */
    packages?: {
        /** If true, this sandbox will have all the packages of admin. */
        allowAllPackagesOfAdmin?: boolean;

        /** If allowAllPackagesOfAdmin == false, then this settings will be applicable and these packages will be installed on this particular sandbox. */
        sandboxPackages?: {
            name: string;
            version: string;
        }[];
    }

    /** Sandbox will be restarted automatically based on these settings without failing any request. */
    autoRestart?: {
        /**
         * - It will work when enableSeparateSandboxForThis is true. <br/>
         * - Sandbox will be restarted after it passes these much of time, after its creation. */
        afterTheseMuchSeconds?: number;
    }
}

export interface ISwaggerDocsObj {
    tag?: string | string[];
    /**
     * Useful to provide custom dynamic parameters.
     * For files you can provide this : [{ in: T.ESwaggerParamInType.formData, name: 'files', type: 'file' }]
     */
    parameters?: ISwaggerParametersEntity[];
}

export interface ISwaggerParametersEntity {
    name: string;
    in: ESwaggerParamInType;
    description?: string;
    required?: boolean;
    format?: string | null;
    schema?: {
        type: 'array' | 'object' | 'string' | 'integer' | 'boolean' | 'file';
        example?: any,
        default?: any;
        enum?: any[];
    };
}

export enum ESwaggerParamInType {
    body = 'body',
    query = 'query',
    path = 'path',
    header = 'header',
    formData = 'formData',
}

export interface ISystemApiSettingsTypes extends IAuthTokenInfoCommon {
    enableCaching?: boolean; // collection level setting
    acceptOnlyEncryptedData?: boolean; // database & collection & api level setting
}

export enum EAuthTokenType {
    AM = 'AM', // API Maker user token
    AM_DB = 'AM_DB', // User database entry
    GOOGLE = 'GOOGLE',
    AWS = 'AWS',
    AZURE = 'AZURE',
    // GITHUB = 'GITHUB',
    // FACEBOOK = 'FACEBOOK',
    // TWITTER = 'TWITTER',
}

export enum EArrayOperation {
    push = 'push',
    addToSet = 'addToSet',
    pull = 'pull',
    pullAll = 'pullAll',
    pop = 'pop',
    set = 'set',
}

export enum EAPIAccessType {
    /** API is not accessible for outside world. Can be used from custom API and code from global "g" object.. */
    NO_ACCESS = 'NO_ACCESS',

    /** API is public and can be accessible without any token. */
    IS_PUBLIC = 'IS_PUBLIC',

    /** API can be accessible using tokens. Required tokens depends on authTokenInfo configuration.. */
    TOKEN_ACCESS = 'TOKEN_ACCESS',
}

export interface IAMGlobalSys {
    db: ICommonApisSchema;
    system: IAMGlobalSysSystem;
    cache: IAMGlobalSysCache;
}

export interface ICommonApisSchema {
    gen: ICommonApisGen;
    /**
     * => Returns [an array of objects].
     */
    getAll<T>(query: IApiParamsGetAll): Promise<T[] | null>;
    getAll<T>(query: IApiParamsGetAll, getFullResponse: boolean): Promise<IAPIResponse<T[] | null>>;

    getAllByStream<T>(query: IApiParamsGetAll, callback: (data: T) => void): Promise<void>;
    /**
     * => Returns [a single object].
     */
    getById<T>(query: IApiParamsGetById): Promise<T>;
    getById<T>(query: IApiParamsGetById, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    saveSingleOrMultiple<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    saveSingleOrMultiple<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    masterSave<T>(query: IApiParamsSave): Promise<T | T[]>;
    masterSave<T>(query: IApiParamsSave, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;

    arrayOperations<T>(query: IArrayOperationBody & IAMGlobalBaseParams): Promise<T>;
    arrayOperations<T>(query: IArrayOperationBody & IAMGlobalBaseParams, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    updateById<T>(query: IApiParamsUpdate): Promise<T>;
    updateById<T>(query: IApiParamsUpdate, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [updatedRowsCount].
     */
    updateMany(query: IApiParamsUpdateMany): Promise<IUpdateManyAPIResponse>;
    updateMany(query: IApiParamsUpdateMany, getFullResponse: boolean): Promise<IAPIResponse<IUpdateManyAPIResponse>>;
    /**
     * => Returns [a single object].
     */
    replaceById<T>(query: IApiParamsUpdate): Promise<T>;
    replaceById<T>(query: IApiParamsUpdate, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    removeById<T>(query: IApiParamsRemove): Promise<T>;
    removeById<T>(query: IApiParamsRemove, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    removeByQuery<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find' | 'headers'>): Promise<T>;
    removeByQuery<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find' | 'headers'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [an array of objects].
     */
    query<T>(query: IApiParamsQuery): Promise<T[]>;
    query<T>(query: IApiParamsQuery, getFullResponse: boolean): Promise<IAPIResponse<T[]>>;

    queryByStream<T>(query: IApiParamsQueryStream, callback: (data: T) => void): Promise<void>;

    aggregate(query: IApiParamsAggregate): Promise<any>;
    aggregate(query: IApiParamsAggregate, getFullResponse: boolean): Promise<IAPIResponse<any>>;

    count(query: IApiParamsCount): Promise<number>;
    count(query: IApiParamsCount, getFullResponse: boolean): IAPIResponse<number>;

    distinct(query: Omit<IApiParamsDistinct, 'find'>): Promise<any[]>;
    distinct(query: Omit<IApiParamsDistinct, 'find'>, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;

    distinctQuery(query: IApiParamsDistinct): Promise<any[]>;
    distinctQuery(query: IApiParamsDistinct, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;
}

export interface ICommonApisGen {
    /**
     * => Returns [an array of objects].
     */
    getAllGen<T>(query: IApiParamsGetAll): Promise<T[] | null>;
    getAllGen<T>(query: IApiParamsGetAll, getFullResponse: boolean): Promise<IAPIResponse<T[] | null>>;

    getAllByStreamGen<T>(query: IApiParamsGetAll, callback: (data: T) => void): Promise<void>;
    /**
     * => Returns [a single object].
     */
    getByIdGen<T>(query: IApiParamsGetById): Promise<T>;
    getByIdGen<T>(query: IApiParamsGetById, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    saveSingleOrMultipleGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    saveSingleOrMultipleGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;
    /**
     * => Returns [a object] or [an array of objects].
     */
    masterSaveGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>): Promise<T | T[]>;
    masterSaveGen<T>(query: Omit<IApiParamsSave, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T | T[]>>;

    arrayOperationsGen<T>(query: IArrayOperationBody & IAMGlobalBaseParams): Promise<T>;
    arrayOperationsGen<T>(query: IArrayOperationBody & IAMGlobalBaseParams, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    updateByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>): Promise<T>;
    updateByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [updatedRowsCount].
     */
    updateManyGen(query: IApiParamsUpdateMany): Promise<IUpdateManyAPIResponse>;
    updateManyGen(query: IApiParamsUpdateMany, getFullResponse: boolean): Promise<IAPIResponse<IUpdateManyAPIResponse>>;
    /**
     * => Returns [a single object].
     */
    replaceByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>): Promise<T>;
    replaceByIdGen<T>(query: Omit<IApiParamsUpdate, 'skipConcurrencyControl'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [a single object].
     */
    removeByIdGen<T>(query: IApiParamsRemove): Promise<T>;
    removeByIdGen<T>(query: IApiParamsRemove, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    removeByQueryGen<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find'>): Promise<T>;
    removeByQueryGen<T>(query: Pick<IApiParamsQuery, 'instance' | 'database' | 'collection' | 'find'>, getFullResponse: boolean): Promise<IAPIResponse<T>>;
    /**
     * => Returns [an array of objects].
     */
    queryGen<T>(query: IApiParamsQuery): Promise<T[]>;
    queryGen<T>(query: IApiParamsQuery, getFullResponse: boolean): Promise<IAPIResponse<T[]>>;

    queryByStreamGen<T>(query: IApiParamsQueryStream, callback: (data: T) => void): Promise<void>;

    aggregateGen(query: IApiParamsAggregate): Promise<any>;
    aggregateGen(query: IApiParamsAggregate, getFullResponse: boolean): Promise<IAPIResponse<any>>;

    countGen(query: IApiParamsCount): Promise<number>;
    countGen(query: IApiParamsCount, getFullResponse: boolean): IAPIResponse<number>;

    distinctGen(query: Omit<IApiParamsDistinct, 'find'>): Promise<any[]>;
    distinctGen(query: Omit<IApiParamsDistinct, 'find'>, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;

    distinctQueryGen(query: IApiParamsDistinct): Promise<any[]>;
    distinctQueryGen(query: IApiParamsDistinct, getFullResponse: boolean): Promise<IAPIResponse<any[]>>;
}

export interface IAMGlobalSysSystem {
    encrypt(body: any): Promise<string>;
    encrypt(body: any, getFullResponse: boolean): Promise<string>;
    encrypt(body: any, algorithm: EEncryptionAlgorithm, pass: string): Promise<string>;
    encrypt(body: any, algorithm: EEncryptionAlgorithm, pass: string, getFullResponse: boolean): Promise<string>;

    decrypt(body: string): Promise<any>;
    decrypt(body: string, getFullResponse: boolean): Promise<string>;
    decrypt(body: string, algorithm: EEncryptionAlgorithm, pass: string): Promise<any>;
    decrypt(body: string, algorithm: EEncryptionAlgorithm, pass: string, getFullResponse: boolean): Promise<string>;

    hash(body: any): any;
    getSecret(name: string | string[], fromSecretName: string, getFullResponse: boolean): any;
    getSecret(name: string | string[], fromSecretName: string): any;
    getSecret(name: string | string[], getFullResponse: boolean): any;
    getSecret(name: string | string[]): any;
    getSecret(): any; // we can call it without any param also, in store and in tp it will return object of that part.
    callExternalApi<T>(data: ICallApiFromBackend | ICallApiFromBackend[] | ICallApiFromBackendProcess | ICallApiFromBackendProcess[] | (ICallApiFromBackend | ICallApiFromBackendProcess)[]): Promise<ICallExternalApiResp<T>>;
    callExternalApi(data: ICallApiFromBackend | ICallApiFromBackend[] | ICallApiFromBackendProcess | ICallApiFromBackendProcess[] | (ICallApiFromBackend | ICallApiFromBackendProcess)[]): Promise<ICallExternalApiResp<any>>;
    getToken(data: IAuthTokenInfo | IAuthTokenInfo[]): any;
    executeQuery(query: IExecuteQuery): any;
    /**
     * It should be used SQL based databases only.
     * In MongoDB You can just modify schema. but we can use for mongo also.
     */
    getTableMeta(data: Omit<IAMGlobalBaseParams, 'headers'>): any;
    emitEvent<D>(eventName: string, eventData?: D, executeListeners?: string[]): Promise<IEmitEvent<D>>;
    emitEventWS<D>(eventName: string, eventData?: D): Promise<void>;

    // data validation
    isValidDataForTable(data: IIsValidDataForTable): Promise<IResponseError[]>;
    isValidDataForTable(data: IIsValidDataForTable[]): Promise<IResponseError[][]>;
    isValidDataForTable(data: IIsValidDataForTable, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForTable(data: IIsValidDataForTable[], getFullResponse: boolean): Promise<IResponseError[][]>;

    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI): Promise<IResponseError[]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI[]): Promise<IResponseError[][]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForCustomAPI(data: IIsValidDataForCustomAPI[], getFullResponse: boolean): Promise<IResponseError[][]>;

    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI): Promise<IResponseError[]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI[]): Promise<IResponseError[][]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI, getFullResponse: boolean): Promise<IResponseError[]>;
    isValidDataForThirdPartyAPI(data: IIsValidDataForThirdPartyAPI[], getFullResponse: boolean): Promise<IResponseError[][]>;

    multiTenantInstanceUpdated(data: IMultiTenantInstanceUpdated | IMultiTenantInstanceUpdated[]): Promise<IResponseError[]>;
    isValidConnectionString(data: IIsValidConnectionString | IIsValidConnectionString[]): Promise<IAPIResponseSmall<boolean> | IAPIResponseSmall<boolean>[]>;
}

// $$$$_8796864_Duplicate
export enum EInstanceType {
    MONGO_DB = 'MONGO_DB',
    MYSQL_DB = 'MYSQL_DB',
    MARIA_DB = 'MARIA_DB',
    SQL_SERVER_DB = 'SQL_SERVER_DB',
    POSTGRE_SQL_DB = 'POSTGRE_SQL_DB',
    ORACLE_DB = 'ORACLE_DB',
}

export interface ICallExternalApiResp<T> {
    statusCode: number;
    headers: any;
    body: T;
}

export interface IResetCacheApiFormat {
    name: string;
    tenantSecretPath?: string;
    tenantUsername?: string;
}

export interface IAMGlobalSysCache {
    getKey(name: string | string[]): any;
    setKey(name: string | ISetRedisInternalRequestObj[], value?: string, ttlSeconds?: number): any;
    removeKey(name: string | string[]): any;
    resetCacheDB(params: IResetRedisCacheDB): any;
    resetCacheCustomApis(name: string): any;
    resetCacheCustomApis(data: IResetCacheApiFormat): any;
    resetCacheSystemApis(name: string): any;
    resetCacheSystemApis(data: IResetCacheApiFormat): any;
    resetCacheThirdPartyApis(params: IResetRedisCacheTP): any;
}

export enum EEncryptionAlgorithm {
    AES = 'AES',
    RC4 = 'RC4',
    TRIPLEDES = 'TRIPLEDES',
}

export enum EHashingAlgorithms {
    SHA256 = 'SHA256',
}

export interface IThirdPartyAPIIdentity {
    apiBundleName: string; // npmPackageName // apiBundleName
    // developedByUsername: string;
    apiVersionName: string;
    name: string;
}

export interface ICollectionIdentity {
    instance: string;
    database?: string;
    collection?: string;
    table?: string;
    /**
     * If true, it will not throw cycle error.<br/>
     * true = Default in custom APIs, schedulers, third party APIs, migration scripts, test cases, because they can not call themselves.<br/>
     * false = Default in Events & pre hooks & post hooks.<br/>
     * If utility class is called from default true category like custom API, it is true, otherwise false.<br/>
     */
    noCycle?: boolean;

    /**
     * Default: true, If true, it will skip pre hook & post hook running.
     */
    skipHookRunning?: boolean;
}

export interface IAMGlobalBaseParams extends ICollectionIdentity {
    headers?: any;
}

export interface IApiParamsGetAll extends IAMGlobalBaseParams {
    queryParams?: IGetAllQueryParams;
}

export interface IGetAllQueryParams {
    find?: any;
    skip?: number;
    limit?: number;
    sort?: any;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    getTotalCount?: boolean;
    [key: string]: any;
}

export interface IApiParamsGetById extends IAMGlobalBaseParams {
    id: any;
    primaryKey?: string;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
}

export interface IApiParamsSave extends IAMGlobalBaseParams {
    saveData?: any; // used to save data in db.

    /** Default true, if true, it will allow update by id & replace by id & master save without version field and it will not throw error when version is different. */
    skipConcurrencyControl?: boolean;
}

export interface IApiParamsQueryStream extends IAMGlobalBaseParams {
    find?: any;
    sort?: any;
    skip?: number;
    limit?: number;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;
    groupBy?: any; // it is used in mysql query
    updateData?: any;
}

export interface IApiParamsQuery extends IApiParamsQueryStream {
    getTotalCount?: boolean;
}

export interface IApiParamsCount extends IAMGlobalBaseParams {
    find?: any;
}

export interface IApiParamsUpdate extends IAMGlobalBaseParams {
    id?: any;
    updateData?: any; // It will be used for bulk update.
    primaryKey?: string;
    upsert?: boolean; // insert if item not available.
    returnDocument?: string; // return old doc if 'before', 'before' | 'after'
    select?: any; // to select which rows will return in response.
    deep?: IApiParamsDeepFormat[] | string[] | string;

    /** System will throw when record not found for the operation */
    throwErrorIfRecordNotFound?: boolean;

    /** Default true, if true, it will allow update by id & replace by id & master save without version field and it will not throw error when version is different. */
    skipConcurrencyControl?: boolean;
}

export interface IApiParamsUpdateMany extends IAMGlobalBaseParams {
    find: any;
    updateData: any;
}

export interface IApiParamsAggregate extends IAMGlobalBaseParams {
    aggregateQuery?: any; // It will be used for aggregate body
}

export interface IApiParamsRemove extends IAMGlobalBaseParams {
    id?: any;
    primaryKey?: string;
    select?: any;
    deep?: IApiParamsDeepFormat[] | string[] | string;

    /** System will throw when record not found for the operation */
    throwErrorIfRecordNotFound?: boolean;
}

export interface IApiParamsDistinct extends IAMGlobalBaseParams {
    distinctField: string;
    order?: 'asc' | 'desc' | any; // asc/desc/dsc , true/false, yes/no, 1/0
    find?: any; // not supported by mongoDB, and supported in SQL dbs.
}

export interface IExecuteQuery {
    instance: string;
    database?: string; // required for postgresql, mongodb only
    collection?: string; // required for mongodb only

    /**
     * You can give SQL query for SQL based databases.<br/>
     * MongoDB = You can give object which will be passed in "command" function.
     * ex: https://www.mongodb.com/docs/drivers/node/current/usage-examples/command/
     * Supported commands : https://www.mongodb.com/docs/v6.0/reference/command/
     */
    query: string | any;
    headers?: any;
}

export interface IEncryptDecryptDataRequest {
    data: string;
    algorithm?: EEncryptionAlgorithm;
    pass?: string;
}

export interface IDecryptDataFETransfer {
    dataEncFE: string;
}

export interface IDecryptDataFETransferPayload {
    data: any;
    createdAt: Date;
}

// it can be value or TTL
export interface ISetRedisInternalRequestObj {
    key: string;
    value?: string;
    ttl?: number; // in seconds
    NX?: boolean; // NX: true → ensures the key is set only if it doesn’t exist.
}

export interface IResetRedisCacheDB extends ICollectionIdentity {
}

export interface IResetRedisCacheTP {
    apiBundleName: string;
    apiVersionName?: string;
    tenantSecretPath?: string;
    tenantUsername?: string;
}

export interface IGetSecretInternalRequestBody {
    keys: string | string[];
    fromSecretName?: string;
    parentParams?: IAMGlobalBaseParams; // it will be present
}

export interface IEmitEvent<D> {
    name: string;
    eventData?: D;
    executeListeners?: string[];
    outputArr?: [{ listenerName: string; output: any; }];
    executedEvents?: IExecutedEvents;
}

export interface IEmitEventWS<D> {
    name: string;
    eventData?: D;
}

export interface IUpdateManyAPIResponse {
    /** When actual update operation happens, it has value greater than 0 */
    updatedRowsCount: number;
}

export interface IAPIResponse<T> {
    data?: T;
    totalCount?: number;
    encryptedData?: string;
    errors?: IResponseError[];
    logs?: any[];
    meta?: IAPIResponseMeta;
    stackTraceErrors?: any[];
    statusCode: EStatusCode;
    success: boolean;
    warnings?: IResponseError[];
}

export type IAPIResponseSmall<T> = Pick<IAPIResponse<T>, 'success' | 'data'> & { error?: any };

// WebSocket connection response format.
export interface IWSResponse {
    type: EWSObjectType;
    response?: IWSRegisterResponse | IWSConnectedResponse | IWSUnregisterResponse | IWSNotificationResponse | IWSLocalClientDataResponse;
    errors?: IResponseError[];
}

export interface IWSRegisterResponse {
    validOnEvents: IWSRegisterOnEvent[];
    invalidOnEvents: IWSRegisterOnEvent[];
}

export interface IWSConnectedResponse {
    connected?: boolean;
}

export type IWSUnregisterResponse = IWSObject;

export interface IWSNotificationResponse {
    eventId: string;
    eventType: ELocalClientSubEventType;
    eventData: any;
}

export interface IWSLocalClientDataResponse {
    data: any;
}

export interface IAPIResponseMeta {
    executionTime?: string;
    executionTimeMS?: number;
    executionPlan?: any[]; // IMongodbExplainPlan[];
    apiAccessGroups?: IAPIAccessGroupMeta[];
    runBy?: ICodeRunByResponse[];
}

export interface ICodeRunByResponse {
    apiCategory: any; // EAPICategory enum value.
    serverId: string;
    processId: string;
    workerId: string;
    port: number;
    publishToRedis?: boolean; // true = if request received by redis.
    enableSeparateSandboxForThis: string;
    allowAllPackagesOfAdmin: boolean;
}

export interface IAPIAccessGroupMeta {
    groupId?: string;
    groupName?: string;
    hasAccess?: boolean;
}

export interface IDeleteAPIResponse {
    deletedRows: any[];
    deletedRowsCount: number;
    ids: any[];
}

export interface IExecutedEvents {
    eventNameArr: string[];
    eventNameMap: any;
}

export interface IIsValidDataForTable extends ICollectionIdentity {
    data: any;
    sendingTo?: 'SAVE' | 'UPDATE';
}

export type IIsValidDataForTable_KA = (keyof IIsValidDataForTable)[];

export enum ECustomAPIDataValidationType {
    BODY = 'BODY',
    QUERY_PARAMS = 'QUERY_PARAMS',
}

export interface IIsValidDataForCustomAPI {
    name: string;
    data: any;
    type: ECustomAPIDataValidationType;
}

export interface IIsValidDataForThirdPartyAPI extends IThirdPartyAPIIdentity {
    data: any;
    type: ECustomAPIDataValidationType;
    isArray?: boolean;
}

export interface IIsValidConnectionString {
    connectionString: string;
    instanceType: EInstanceType;

    // Oracle database fields.
    oracleDBUsername?: string;
    oracleDBPassword?: string;
    oracleDBPrivilege?: string;
}

export interface IMultiTenantInstanceUpdated {
    instanceName: string;
    username: string;
}

export enum EWSEventType {
    INSTANCES = 'INSTANCES',
    THIRD_PARTY_APIS = 'THIRD_PARTY_APIS',
    CUSTOM_APIS = 'CUSTOM_APIS',
    SYSTEM_APIS = 'SYSTEM_APIS',
    CUSTOM_WS_EVENTS = 'CUSTOM_WS_EVENTS',

    // Below is only used for local client sync
    LOCAL_CLIENT_SYNC_EVENTS = 'LOCAL_CLIENT_SYNC_EVENTS',

    // Below is only used for browser client sync
    BROWSER_CLIENT_SYNC_EVENTS = 'BROWSER_CLIENT_SYNC_EVENTS',
}

export enum EWSObjectType {
    REGISTER = 'REGISTER',
    UNREGISTER = 'UNREGISTER',
    CONNECTED = 'CONNECTED',
    UNKNOWN = 'UNKNOWN',
    TOKEN_VALIDATION = 'TOKEN_VALIDATION',
    NOTIFICATION = 'NOTIFICATION',

    // Below is only used for local client sync
    LC_DATA_REQ_RES = 'LC_DATA_REQ_RES',

    // Below is only used for browser client sync
    BROWSER_DATA_REQ_RES = 'BROWSER_DATA_REQ_RES',
}

export enum ELocalClientSubEventType {
    LC_SEND_ALL_DATA = 'LC_SEND_ALL_DATA',
    LC_DATA_MODIFIED_IN_DATABASE = 'LC_DATA_MODIFIED_IN_DATABASE', // send to local client
    LC_FOLDER_CHANGED_ON_LOCAL_SYSTEM = 'LC_FOLDER_CHANGED_ON_LOCAL_SYSTEM', // received on server

    BROWSER_DATA_MODIFIED_IN_DATABASE = 'BROWSER_DATA_MODIFIED_IN_DATABASE', // send to browser client
    BROWSER_GIT_PULL_HAPPENED = 'BROWSER_GIT_PULL_HAPPENED', // send to browser client
}

export interface IWSObject {
    guid: string;
    objType: EWSObjectType;
    onEvents: IWSRegisterOnEvent[];
    validatedTokens: {
        apiUser?: any; // IApiUser
        amUser?: any; // IUser
    };
    auth: ISandboxReqAuthObj;
    localClientWSReqRes?: {
        eventType: ELocalClientSubEventType;
        folderChangedOnLocalSystem: any;
        category: any; // EGitSyncType
        shouldReplaceAllItemsOfCategory?: boolean; // if true, BE will remove all existing items and put all received items in DB
    }
}

export type IWSObject_P = Partial<IWSObject>;

export interface IWSRegisterOnEvent {
    wsClientId?: string; // GUID of every connected client
    eventId?: string; // it will be generated by BE and it is useful to unregister that specific event.
    wsEventId?: string; // used in log saving. _id of IWebSocketEvents
    eventType: EWSEventType;

    // instance apis
    instance?: string;
    database?: string;
    collection?: string;
    table?: string;

    // third party apis
    apiBundleName?: string;
    apiVersion?: string;

    apiName: string;

    condition?: IWSCondition; // receive event when this condition match.
    select?: any; // select fields from objects after condition matched.
    getEventData?: boolean; // if true we will send eventData based on select, otherwise we will not send eventData field in WS notifications

    // calculated field. // user will not provide it.
    eventData?: any;
    apiPath: string; // user will not send it. We will set it from api user token. and user hit that get token system api to get token of specific admin.
    tenantUsername?: string;
}

export type IWSRegisterOnEvent_P = Partial<IWSRegisterOnEvent>;

export interface IWSCondition {
    conditionType: EWSConditionType;
    criteria: any;
}

export enum EWSConditionType {
    RESPONSE = 'RESPONSE',
}

export interface ITestCaseSuccess {
    name?: string;
    testCasePass: true;
    smallTestCases?: ITestCaseResult[];
}

export interface ITestCaseFail {
    name?: string;
    testCasePass: false;
    message?: string;
    actual?: any; // variable value.
    expected?: any; // variable value should be this expected value.
    smallTestCases?: ITestCaseResult[];
    stack?: any;
    errors?: any;
}

export type ITestCaseResult = ITestCaseSuccess | ITestCaseFail; // _id is test case _id.

export interface ITestCaseSandboxCode {
    name: string;
    code: Function;

    // calculated fields while running
    smallTestCasePass?: boolean;
    error?: any; // it can be array of errors or single error. When coming from system API calls, it can be array.
}

export type ITestCaseSandboxCode_P = Partial<ITestCaseSandboxCode>;

export enum EFilesVariables {
    files = 'files',
    files1 = 'files1',
    files2 = 'files2',
    files3 = 'files3',
    files4 = 'files4',
    files5 = 'files5',
    files6 = 'files6',
    files7 = 'files7',
    files8 = 'files8',
    files9 = 'files9',
    files10 = 'files10',
    files11 = 'files11',
    files12 = 'files12',
    files13 = 'files13',
    files14 = 'files14',
    files15 = 'files15',
    files16 = 'files16',
    files17 = 'files17',
    files18 = 'files18',
    files19 = 'files19',
    files20 = 'files20',
    files21 = 'files21',
    files22 = 'files22',
    files23 = 'files23',
    files24 = 'files24',
    files25 = 'files25',
    files26 = 'files26',
    files27 = 'files27',
    files28 = 'files28',
    files29 = 'files29',
    files30 = 'files30',
    files31 = 'files31',
    files32 = 'files32',
    files33 = 'files33',
    files34 = 'files34',
    files35 = 'files35',
    files36 = 'files36',
    files37 = 'files37',
    files38 = 'files38',
    files39 = 'files39',
    files40 = 'files40',
    files41 = 'files41',
    files42 = 'files42',
    files43 = 'files43',
    files44 = 'files44',
    files45 = 'files45',
    files46 = 'files46',
    files47 = 'files47',
    files48 = 'files48',
    files49 = 'files49',
    files50 = 'files50',
}

export enum EGitSyncMode {
    SYNC_ALL = 'SYNC_ALL',
    SYNC_WITHOUT_SECRET = 'SYNC_WITHOUT_SECRET',
}

export interface IDeployUsersCodeQueryParams {
    token: string;
    secret: string;
    branch: string;
    runMigrationScripts?: 'false' | 'true';
    syncMode?: EGitSyncMode;
}

// ==== DB Master configurations Start ====

export interface IUIMakerURLQueryParams {
    /** If you provide id in URL, it will open that Id in edit mode. */
    id?: any;

    /** Default edit, It will open form in edit or view mode based on passed value. */
    'form-open-mode'?: EDBMasterGridOperationsOrder | null;

    /** name of ui page */
    'db-master-name'?: string;

    /** admin user path */
    'admin-path'?: string;

    /** true | false // If passed, master will wait until parent is done with setting its data. */
    'wait-for-parent-ready'?: string;

    /** Default: false, If true, it will print debugging logs in console */
    'show-logs'?: string;

    /** You can pass theme in URL also */
    theme?: any;
}

export enum EDBMasterTheme {
    BOOTSTRAP4_LIGHT_BLUE = 'bootstrap4-light-blue',
    BOOTSTRAP4_LIGHT_PURPLE = 'bootstrap4-light-purple',
    BOOTSTRAP4_DARK_BLUE = 'bootstrap4-dark-blue',
    BOOTSTRAP4_DARK_PURPLE = 'bootstrap4-dark-purple',
    MD_LIGHT_INDIGO = 'md-light-indigo',
    MD_LIGHT_DEEPPURPLE = 'md-light-deeppurple',
    MD_DARK_INDIGO = 'md-dark-indigo',
    MD_DARK_DEEPPURPLE = 'md-dark-deeppurple',
    MDC_LIGHT_INDIGO = 'mdc-light-indigo',
    MDC_LIGHT_DEEPPURPLE = 'mdc-light-deeppurple',
    MDC_DARK_INDIGO = 'mdc-dark-indigo',
    MDC_DARK_DEEPPURPLE = 'mdc-dark-deeppurple',
    FLUENT_LIGHT = 'fluent-light',
    LARA_LIGHT_BLUE = 'lara-light-blue',
    LARA_LIGHT_INDIGO = 'lara-light-indigo',
    LARA_LIGHT_PURPLE = 'lara-light-purple',
    LARA_LIGHT_TEAL = 'lara-light-teal',
    LARA_DARK_BLUE = 'lara-dark-blue',
    LARA_DARK_INDIGO = 'lara-dark-indigo',
    LARA_DARK_PURPLE = 'lara-dark-purple',
    LARA_DARK_TEAL = 'lara-dark-teal',
    SOHO_LIGHT = 'soho-light',
    SOHO_DARK = 'soho-dark',
    VIVA_LIGHT = 'viva-light',
    VIVA_DARK = 'viva-dark',
    MIRA = 'mira',
    NANO = 'nano',
    SAGA_BLUE = 'saga-blue',
    SAGA_GREEN = 'saga-green',
    SAGA_ORANGE = 'saga-orange',
    SAGA_PURPLE = 'saga-purple',
    VELA_BLUE = 'vela-blue',
    VELA_GREEN = 'vela-green',
    VELA_ORANGE = 'vela-orange',
    VELA_PURPLE = 'vela-purple',
    ARYA_BLUE = 'arya-blue',
    ARYA_GREEN = 'arya-green',
    ARYA_ORANGE = 'arya-orange',
    ARYA_PURPLE = 'arya-purple',
    NOVA = 'nova',
    NOVA_ALT = 'nova-alt',
    NOVA_ACCENT = 'nova-accent',
    LUNA_AMBER = 'luna-amber',
    LUNA_BLUE = 'luna-blue',
    LUNA_GREEN = 'luna-green',
    LUNA_PINK = 'luna-pink',
    RHEA = 'rhea',
}

export enum EDBMasterGridExport {
    CSV = 'CSV',
    CSV_SELECTED = 'CSV Selected',
    // PDF = 'PDF',
}

export enum EDBMasterDataImport {
    CSV = 'CSV',
}

export interface IDBMasterConfig {
    theme?: EDBMasterTheme;

    // Multi tenant architecture related fields
    tenantUsername?: string;

    /**
     * Used in many places. Use in add form will look like ex: Add ${screenName}.<br/>
     * You can provide value like 'Person' | 'Contact Details'. <br/>
     * It gives more personalized success/error messages for that particular screen.
     */
    screenName?: string;

    /**
     * We can provide schema in this and it will append fields to parent schema.
     */
    schema?: {
        instanceName: string;
        databaseName: string;
        collectionName: string;
        properties: ISchemaType;
    }

    /** Default : false */
    showThemeSelector?: boolean;

    /**
     * Default : browser timezone.
     * Dates will be converted into this timezone before display in grid and sending to database query.
     * Timezone List : https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     */
    dateTimeZone?: string;

    /**
     * Default : 'dd-MM-yyyy hh:mm:ss a'
     * System is using date-fns formats to format date object in grid cells.
     * This format will be converted automatically for primeNG calendar control.
     * It will not work when unsupported format options of primeNg calendar control are used.
     *
     * PrimeNG calendar does not support time format but it will be automatically appended.
     * This format will be default for all Calendar control in UI.
     */
    dateTimeFormat?: string;

    operations?: {
        add?: IDBMasterConfigOperation;
        hideAddConfirmation?: boolean;
        /** Default : false. If true, it will not show delete all button. */
        hideDeleteAllButton?: boolean;
        hideDeleteAllConfirmation?: boolean;

        deleteAllButtonSettings?: {
            /** default : true */
            raised?: boolean;

            /** Default : pi pi-trash */
            icon?: string;

            /** comma separated CSS classes */
            cssClass?: string;

            /** Give style object in angular style. */
            style?: any;

            severity?: uiMakerComponentSeverity;
        }

        showRefreshButton?: boolean;

        refreshButtonSettings?: {
            /** default : true */
            raised?: boolean;

            /** Default : pi pi-sync */
            icon?: string;

            /** comma separated CSS classes */
            cssClass?: string;

            /** Give style object in angular style. */
            style?: any;

            severity?: uiMakerComponentSeverity;
        }

        /**
         * Default : T.EDBMasterOperationsOrder.theme_selector,
         *           T.EDBMasterOperationsOrder.column_selector,
         *           T.EDBMasterOperationsOrder.global_search,
         *           T.EDBMasterOperationsOrder.import,
         *           T.EDBMasterOperationsOrder.export,
         *           T.EDBMasterOperationsOrder.export_csv_single,
         *           T.EDBMasterOperationsOrder.refresh,
         *           T.EDBMasterOperationsOrder.add,
         *           T.EDBMasterOperationsOrder.custom_actions,
         *           T.EDBMasterOperationsOrder.delete_all,
         * */
        operationsOrder?: (
            EDBMasterOperationsOrder.custom_actions
            | EDBMasterOperationsOrder.delete_all
            | EDBMasterOperationsOrder.add
            | EDBMasterOperationsOrder.refresh
            | EDBMasterOperationsOrder.export
            | EDBMasterOperationsOrder.export_csv_single
            | EDBMasterOperationsOrder.import
            | EDBMasterOperationsOrder.global_search
            | EDBMasterOperationsOrder.column_selector
            | EDBMasterOperationsOrder.theme_selector)[];

        customActionButtons?: IDBMasterTopLevelCustomActionButton[];

        importData?: IDBMasterImportData;

        exportData?: {
            showExportButton?: boolean;

            /** Default : pi pi-download */
            icon?: string;

            /** default : true */
            raised?: boolean;

            /** comma separated CSS classes */
            cssClass?: string;

            severity?: uiMakerComponentSeverity;

            /** default : Export data */
            tooltip?: string;

            /** Give style object in angular style. */
            style?: any;

            csv?: {
                enable?: boolean;

                /** Default : CSV */
                labelCSV?: string;

                /** Default : CSV Selected */
                labelCSVSelected?: string;

                /** Only these fields of grid will be exported. We can include hidden fields or calculated fields also in this. */
                exportFields?: Pick<IDBMasterConfigGridField, 'path' | 'header'>[];

                /** It will be suggested file name for download */
                exportFileName?: string;
            }
            // pdf?: boolean;
        }

        showExportCSVSingleButton?: boolean;

        showExportCSVSingleButtonSettings?: {
            /** default : true */
            raised?: boolean;

            /** Default : pi pi-sync */
            icon?: string;

            /** comma separated CSS classes */
            cssClass?: string;

            /** Give style object in angular style. */
            style?: any;

            severity?: uiMakerComponentSeverity;
        }
    };
    /** Provide CDN path of JS/CSS libraries */
    externalLibs?: {
        css?: string[],
        js?: string[],
    },
    /** Provide names of styles provided in UI Maker. */
    loadUiMakerStyleNames?: string[],

    /** Pure CSS code which will be included in head tag of the page. */
    cssCode?: {
        runOn: 'header',
        code: string,
    }[],

    jsCode?: {

        /**
         * oncePageLoad = Code will be run only once on page load. config and global data are not available. It will append script to page script tag. <br/>
         * oncePageLoadWithContext = Code will be run only once on page load with context of data. (config, globalData: any, utils: any, queryParams: any) <br/>
         * gridRender = Gets executed everytime grid gets data. (gridEvent, gridData, globalData: any, utils: any, queryParams: any) <br/>
         * modifyGridRequest = You can modify api call request. (gridEvent, reqBody: IQueryFormat, globalData: any, utils: any, queryParams: any) <br/>
         * preSaveAndEdit = run code before save & edit operation of form. Change data before saving/update/import. (reqBody: any | any[], globalData: any, utils: any, queryParams: any, mode: 'save' | 'edit' | 'import') <br/>
         * beforeSaveModalOpen = Change data before save modal open. (formData: any , globalData: any, utils: any, queryParams: any) <br/>
         * beforeEditModalOpen = Change data before edit modal open. (formData: any , globalData: any, utils: any, queryParams: any) <br/>
         *
         */
        appendTo: EDBMasterConfigAppendTo,
        /**
         * // gridEvent, gridData are available to use.
         *
         * // Return promise for long awaiting tasks.
         * new Promise(async (resolve, reject) => {
         *     await new Promise(r => setTimeout(r, 3000));
         *     gridData[0].name = 'Sample data';
         *     resolve();
         * });
         *
         * // Directly modify data of grid
         * gridData[0].name = 'Sample data';
         *
         * // Return function
         * (function setData() { gridData[0].name = 'Sample data'; } );
         *
         */
        code: string,
    }[],
    grid?: {
        header?: string;

        /** ex: Showing {first} to {last} of {totalRecords} entries */
        currentPageReportTemplate?: string;

        /** Default : false */
        showColumnSelector?: boolean;

        /** Default : 50rem */
        minWidth?: string;

        /** Default : 40rem */
        breakpoint?: string;

        /** Used for nested grid only. From this field it will pickup data array and show grid based on that */
        dataFieldPath?: string;

        operations?: {
            delete?: Omit<IDBMasterConfigOperation, 'label'> & { apiCallOverridesDeleteMany?: IDBMasterAPICallOverrides; };
            edit?: Omit<IDBMasterConfigOperation, 'label'> & { apiCallOverridesGetById?: IDBMasterAPICallOverrides; };
            view?: Omit<IDBMasterConfigOperation, 'label'> & { apiCallOverridesGetById?: IDBMasterAPICallOverrides; };

            hideDeleteConfirmation?: boolean;
            hideEditConfirmation?: boolean;
            /** Default : false, if true, it will not show success message when delete multiple is used. You need to provide that message manually. */
            hideDeleteManySuccessMessage?: boolean;

            disableDoubleClickForEdit?: boolean;
            disableDeleteButtonClickForDelete?: boolean;

            /** Only 3 */
            gridOperationsOrder?: (EDBMasterGridOperationsOrder.delete | EDBMasterGridOperationsOrder.edit | EDBMasterGridOperationsOrder.view | EDBMasterGridOperationsOrder.custom)[];

            /** Only 3 */
            gridColumnsOrder?: (EDBMasterGridColumnsOrder.checkbox | EDBMasterGridColumnsOrder.actions | EDBMasterGridColumnsOrder.dbFields)[];

            actionColumnWidth?: string;

            customActionButtons?: IDBMasterCustomActionButton[];
        };

        /**
         * If empty, it will generate grid for all fields of schema in schema order.
         * It will not generate _id for Mongo DB.
         */
        fields?: IDBMasterConfigGridField[],

        /**
         * Ex1 : { name: 1 }
         * Ex2 : { password : -1 }
         * It supports syntax of select object in API Maker's query API.
         * By default, all fields of database table will be selected.
         * Not applicable for nested grids.
         */
        selectFieldsForQuery?: {
            [field: string]: 1 | -1
        };

        /**
         * Default : 'single'. Default sorting is executed on a single column, in order to enable multiple field sorting,
         * set sortMode property to "multiple" and use metakey(ctrl | cmd) when clicking on another column.
         */
        sortMode?: 'single' | 'multiple';

        /**
         * Ex : [{ field: 'name', order: 1 }]
         * Useful to have columns sorted by default.
         * To make it work, field should have enableSorting true.
         */
        multiSortMeta?: { field: string; order: -1 | 1 }[];

        pagination?: {
            /** Default : false */
            showPagination?: boolean;

            /** Default : false, this will not work for nested grid. */
            serverSidePagination?: boolean;

            /** Default : 10 */
            rowsPerPage?: number;

            /** Default : [10, 20, 50, 100, 500, 1000] */
            rowsPerPageOptions?: number[];
        }

        grouping?: {
            // rowGroupMode: 'subheader'; // default : subheader. rowspan = is not supported.

            /** group by column name */
            groupRowsBy: string;

            /** Give style object in angular style. */
            headerStyle?: any;

            /** You can provide single or multiple classes. */
            headerCssClass?: string,

            /** Give style object in angular style. */
            footerStyle?: any;

            /** You can provide single or multiple classes. */
            footerCssClass?: string,

            /** Group footer will be generated from this property of object. */
            footerColumnPath?: string,
        }

        selection?: {
            /** Default grid selection mode is multiple */
            mode: 'single' | 'multiple';

            /** name of primary key field. Default : it will be automatically pickup from schema. */
            dataKey?: string;

            /** Default : true, If true we need Ctrl | Cmd to select row. */
            metaKeySelection?: boolean;

            /** Default : false, Works only with mode=multiple. If true it will show checkbox column for selection. */
            checkboxSelection?: boolean;
        }

        filter?: {
            /** Default : false, if true you can filter in all fields */
            showGlobalSearch?: boolean;

            // country.name is supported by primeNG table.
            /**
             * Ex: ['name', 'first_name', 'country.name']
             * It will work only for string & number fields.
             * For string, it will check for contains and for number type, will be exact match query.
             */
            globalSearchFields?: string[];

            /** Default : false, if true it will show filter for each column */
            rowFilter?: boolean;
        }

        apiCallOverrides?: IDBMasterAPICallOverrides;
    };
    form?: {
        /** add custom css class to form dialog. */
        cssClass?: string,

        /** Give style object in angular style to form dialog. */
        style?: any;

        /** only applicable for top level form modal. */
        draggable?: boolean;

        /** default: true, Whether the dialog can be displayed full screen. */
        maximizable?: boolean;

        /** Ex : 90vw */
        width?: string;

        /** Default: false, If true, it will hide close button. */
        hideCloseButton?: boolean;

        /** Default: Save, It will be used as label of save button  */
        labelOfSaveButton?: string;

        /** Default: Update, It will be used as label of update button in edit operation  */
        labelOfUpdateButton?: string;

        /** Default: Cancel, It will be used as label of cancel/close button  */
        labelOfCancelButton?: string;

        /** Default : true,
         * If multiple is coming from API which is not mapped to any field, it will show in table.
         * In case of only one error, it will show in notification.
         * If false, it will not show table and show first error in notification.
         * */
        showOtherFieldErrors?: boolean;

        /** Generates UI controls. */
        fields?: IDBMasterConfigFormField[][];
    };

}

export enum EDBMasterOperationsOrder {
    custom_actions = 'custom_actions',
    delete_all = 'delete_all',
    add = 'add',
    refresh = 'refresh',
    export = 'export',
    export_csv_single = 'export_csv_single',
    import = 'import',
    global_search = 'global_search',
    column_selector = 'column_selector',
    theme_selector = 'theme_selector',
}

export enum EDBMasterGridOperationsOrder {
    delete = 'delete',
    edit = 'edit',
    view = 'view',
    custom = 'custom',
}

export enum EDBMasterGridColumnsOrder {
    checkbox = 'checkbox',
    actions = 'actions',
    dbFields = 'dbFields',
}

export interface IDBMasterImportData {
    enable: boolean;

    /** Default : pi pi-file-import */
    icon?: string;

    /** default : true */
    raised?: boolean;

    /** comma separated CSS classes */
    cssClass?: string;

    severity?: uiMakerComponentSeverity;

    /** default : Export data */
    tooltip?: string;

    /** Give style object in angular style. */
    style?: any;

    /** width of grid. */
    gridWidth?: string;

    fieldMappings: IDBMasterImportGridColumn[];

    /** By default it can use save API. */
    apiCallOverrides?: IDBMasterAPICallOverrides;
}

export interface IDBMasterImportGridColumn {
    header: string;

    /** CSV field map */
    sourceField: string;

    /** It will be database field, csv data will be stored into this field after conversion. */
    targetField: string;

    /** CSV data will be converted to this type. */
    convertTargetFieldToType: EType;

    /** Default: ISO date format, date-fns format, Dates from CSV will be parsed using this format. */
    dateParseFormat?: string;

    /** Dates will be converted into this timezone before sending to database query. */
    dateTimeZone?: string;

    /** Dates will be converted to this format to display in UI.<br/> */
    dateFormatUIDisplay?: string;

    /** Dates will be converted to this format to display in UI.<br/> */
    dateTimeZoneUIDisplay?: string;

    // calculated property
    filterType?: EDBMasterConfigFilterType;

    /** width of grid column */
    width?: string;
}

export interface IDBMasterCustomActionButton {
    /** So parent can identify which custom action button clicked. */
    actionName: string;

    /** ex : pi pi-check. https://primeng.org/icons */
    cssClass?: string,

    /** Give style object in angular style. */
    style?: any;

    /** default : true */
    raised?: boolean;

    /**
     * If provided, it will ask for confirmation with this message.<br/>
     * Below variables are available<br/>
     * selectedGridItems = entire row object or array of selected rows. If grid header level action button clicked it will be array of selected rows.
     *     -- If grid row action button clicked it will be entire row.<br/>
     * ex: confirmationMessageScript: "`Do you want to approve ${selectedGridItems.length}?`",
     * */
    confirmationMessageScript?: string;

    /** custom HTML code of button */
    htmlCode?: string;

    jsCode?: {
        /**
         * Available variables:<br/>
         * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
         * utils: any = Common utility functions for user to use. <br/>
         * queryParams: any = Query params received from URL. <br/>
         * config: IDBMasterConfigFormField <br/>
         * gridData: Array of grid data. <br/>
         * selectedGridItems: Selected grid items. <br/>
         * event: any <br/>
         */
        appendTo: EDBMasterCustomActionButtonAppendTo,
        /**
         * // Return promise for long awaiting tasks.
         * new Promise(async (resolve, reject) => {
         *     await new Promise(r => setTimeout(r, 3000));
         *     resolve();
         * });
         *
         * // Return function
         * (function setData() { dropdownData[0].name = 'Sample data'; } );
         *
         */
        code: string,
    }[],
}

type uiMakerComponentSeverity = 'contrast' | 'danger' | 'help' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

export interface IDBMasterTopLevelCustomActionButton extends Omit<IDBMasterCustomActionButton, 'cssClass'> {
    /** custom CSS class to assign to button */
    cssClass?: string,

    /** Give label to button */
    label?: string;

    /** Default: info */
    severity?: uiMakerComponentSeverity;

    /** ex : pi pi-check https://primeng.org/icons */
    icon?: string;

    /** Default: true, if false it will be enabled even if no row selected in grid. */
    isDependentOnGridSelection?: boolean;
}

export interface IDBMasterConfigGridFilterOfField {
    matchMode: EDBMasterMatchMode;
    value: string;
}

export interface IDBMasterConfigOperation {
    enable: boolean;

    /** default : true */
    raised?: boolean;

    /** Gives label to Add button which is visible on top of the grid. Applicable for add button only. */
    label?: string;

    /** Applicable for add button only. */
    cssClass?: string;

    /** Give style object in angular style. */
    style?: any;

    severity?: uiMakerComponentSeverity;

    /** ex : pi pi-plus https://primeng.org/icons */
    icon?: string;

    apiCallOverrides?: IDBMasterAPICallOverrides;
}

export interface IDBMasterAPICallOverrides {
    url: string;
    headers?: any;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    body?: any;

    /**
     * JSON is expected and it will be converted query parameters and appended in URL.
     * */
    queryParams?: any;

    /** Primary key field name for current table. _id for mongodb. */
    pkField?: string;

    /**
     * Below variables are available,
     * config: IDBMasterConfig,<br/>
     * formData: any, Not available in case of grid.<br/>
     * allDropdownDataMap: { [path: string]: any[] }, Not available in case of grid.<br/>
     * apiResponse: any,<br/>
     * globalData: any,<br/>
     * headers: any,<br/>
     * reqBody: any,<br/>
     * utils: any,<br/>
     * queryParams: any,<br/>
     * mode: any | null,<br/>
     * */
    codeBeforeAPICall?: string;

    /**
     * Below variables are available,
     * config: IDBMasterConfig,<br/>
     * formData: any, Not available in case of grid.<br/>
     * allDropdownDataMap: { [path: string]: any[] }, Not available in case of grid.<br/>
     * apiResponse: any,<br/>
     * globalData: any,<br/>
     * headers: any,<br/>
     * reqBody: any,<br/>
     * utils: any,<br/>
     * queryParams: any,<br/>
     * mode: any | null,<br/>
     * */
    codeAfterAPICall?: string;
}

export enum EDBMasterMatchMode {
    contains = 'contains',
    notContains = 'notContains',
    startsWith = 'startsWith',
    endsWith = 'endsWith',
    equals = 'equals',
    notEquals = 'notEquals',

    lt = 'lt',
    lte = 'lte',
    gt = 'gt',
    gte = 'gte',

    dateIs = 'dateIs',
    dateIsNot = 'dateIsNot',
    dateBefore = 'dateBefore',
    dateAfter = 'dateAfter',
}

export interface IDBMasterConfigGridField {
    /** It will be picked up automatically from schema, but if not provided in schema, you can define at this place. */
    type?: EType;

    /** Grid header */
    header: string;

    /** Database field name or path for nested objects. */
    path?: string; // nested fields like 'country.name' is supported by primeNG grid

    /** If displayField provided, it will display from this field otherwise it will display value of path field. */
    displayField?: string;

    /** Placeholder value for filter in header */
    placeHolderOfFilterInHeader?: string;

    /** If true, filter in header will be hidden. */
    hideFilter?: boolean;

    /** Default false, it will format dates in 'dd-MM-yyyy hh:mm:ss a' automatically if 'dateTimeFormat' is not provided. */
    autoFormatDate?: boolean;

    /** Dates will be converted into this timezone before sending to database query. */
    dateTimeZone?: string;

    /** Default : 'dd-MM-yyyy hh:mm:ss a' . System is using date-fns formats to format date object. */
    dateTimeFormat?: string;

    /** Set date time format based on primeng format. */
    dateTimeFormatFilter?: string;

    /** Default : false, if true sorting will be enabled for this field. */
    enableSorting?: boolean;

    dataSource?: 'db_data';
    dbData?: {
        instance?: string;
        database?: string;
        collection?: string;
        pkField?: string;
        displayField: string;

        /** if select is provided, it will get those data. Make sure displayField is included in it. */
        select?: any;
    };

    /** ex: 200px */
    width?: string;

    /** Give style object in angular style. */
    headerStyle?: any;

    /** custom CSS class to assign */
    headerCssClass?: string,

    /** Give style object in angular style. */
    dataCellStyle?: any;

    /** custom CSS class to assign */
    dataCellCssClass?: string,

    /** Set column visibility in grid and in export. */
    visibilityStatus?: EDBMasterConfigGridColumnVisibilityStatus;
}

/** For internal use only. */
export interface IDBMasterConfigGridFieldExport extends IDBMasterConfigGridField {

    /** PrimeNG needs it for export purpose from grid. It should be present in [columns] */
    field?: string;

    /** Calculated property based on schema. Used to give type to <p-columnFilter>. */
    filterType?: EDBMasterConfigFilterType;

    /** Sets default match mode to column filter */
    matchModeForFilterInColumn?: EDBMasterMatchMode;
}

export enum EDBMasterConfigFilterType {
    text = 'text',
    numeric = 'numeric',
    boolean = 'boolean',
    date = 'date',
}

export enum EDBMasterConfigGridColumnVisibilityStatus {
    /** Default and column is visible in grid. */
    VISIBLE = 'VISIBLE',

    /** Column is present in grid but hidden by default. Need to select in column selector dropdown. */
    INVISIBLE = 'INVISIBLE',
}

// genericConfig : start
export interface IDBMasterConfigFormField {
    /** It is used to find element. */
    hiddenId?: string;
    label?: string;

    /** This text will be displayed under control in small. HTML supported. */
    helpText?: string;

    /** database field name, UI control value will be saved on this property in save/update object. */
    path?: string;

    /** UI control type */
    control?: EDBMasterFormControl;

    /**
     * Default : col-lg mt-4 col-md-{ 12 / ((columns.length === 2 ? 4 : columns.length) / 2) } <br/>
     * It will be applied to parent div which holds UI control in it.
     * */
    cssClassDiv?: string;

    /** if true, that control will take focus automatically. */
    autofocus?: boolean;

    /** if true, control will be disabled. If string provides, it will evaluate that string and enable/disable based on that. */
    disabled?: boolean | string;

    /** if true or undefined, control will be visible. If string provides, it will evaluate that string and make it visible/invisible based on that. */
    visible?: boolean | string;

    /** Generates UI controls. */
    fields?: IDBMasterConfigFormField[][];

    validations?: Pick<IPropertyValidation, 'required'> & {
        /** If requiredFun is present, that code will be executed when form data is getting changed and it sets value in required.<br/>
         * Value of required will be ignored when requiredFun is present because system will evaluate "requiredFun" and it's output will be value of "required"
         * */
        requiredFun?: string;
    };
    validationErrors?: {
        required?: string;
    };
    // genericConfig : end

    // gridSettings : start
    gridSettings?: Omit<IDBMasterConfig, 'schema'>;
    // gridSettings : end

    // textAreaSettings : start
    textAreaSettings?: {
        /** Give style object in angular style. */
        style?: any;

        placeholder?: string;
        rows?: number;
        autoResize?: boolean;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterTextAreaAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // textAreaSettings : end

    // editorSettings : start
    editorSettings?: {
        /** Give style object in angular style. */
        style?: any;

        placeholder?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Only those controls and formats will be allowed
         * ex: ['background', 'bold', 'color', 'font', 'code', 'italic', 'link', 'size', 'strike', 'script', 'underline', 'blockquote', 'header', 'indent', 'list', 'align', 'direction', 'code-block', 'image', 'video', 'clean']
         * */
        formats?: string[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterEditorAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // editorSettings : end

    // inputTextSettings : start
    inputTextSettings?: {
        /** Give style object in angular style. */
        style?: any;

        placeholder?: string;

        /** Default is off */
        autocomplete?: 'on' | 'off' | undefined;

        /** Default is false */
        spellcheck?: 'true' | 'false' | undefined;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Minimum number of character allows in the input field. */
        minLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputTextAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],

        validationErrors?: {
            minLength?: string;
        };
    };
    // inputTextSettings : end

    // inputNumberSettings : start
    /** Doc : https://primeng.org/inputnumber */
    inputNumberSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        min?: number;
        max?: number;
        minFractionDigits?: number;
        mode?: 'decimal' | 'currency' | '';

        /** The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided. */
        currency?: string;

        /** Default : 'en-US' */
        locale?: string;
        prefix?: string;
        suffix?: string;

        // buttons
        showButtons?: boolean;

        /** Default : stacked */
        buttonLayout?: 'stacked' | 'horizontal' | 'vertical';
        step?: number;

        /** Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. */
        useGrouping?: boolean;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Minimum number of character allows in the input field. */
        minLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputNumberAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],

        validationErrors?: {
            minLength?: string;
        };
    };
    // inputNumberSettings : end

    // inputMaskSettings : start
    inputMaskSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Ex : mask="99-999999", mask="(999) 999-9999? x99999"  <br/>
         * Mask format can be a combination of the following definitions; <br/>
         * a for alphabetic characters, <br/>
         * 9 for numeric characters and  <br/>
         * * for alphanumeric characters. <br/>
         * In addition, formatting characters like ( , ) , - are also accepted. <br/>
         *
         * ? is used to mark anything after the question mark optional. <br/>
         * */
        mask?: string;

        /** Advisory information to display on input. */
        placeholder?: string;

        /** Ex : slotChar="mm/dd/yyyy" <br/>
         * Default placeholder for a mask is underscore that can be customized using slotChar property.
         *  */
        slotChar?: string;

        /** Default : true, Clears the incomplete value on blur. */
        autoClear?: boolean;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputMaskAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // inputMaskSettings : end

    // inputOtpSettings : start
    inputOtpSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** Enable the mask option to hide the values in the input fields. */
        mask?: boolean;

        /** When integerOnly is present, only integers can be accepted as input. */
        integerOnly?: boolean;

        /** Default : 300px; */
        uiControlWidth?: string;

        /** Number of characters to initiate. */
        length?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;
    };
    // inputOtpSettings : end

    // inputPasswordSettings : start
    inputPasswordSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterInputPasswordAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // inputPasswordSettings : end

    // checkboxSettings : start
    checkboxSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterCheckboxAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // checkboxSettings : end

    // ratingSettings : start
    ratingSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Default : true, When specified a cancel icon is displayed to allow removing the value. */
        cancel?: boolean;

        /** Style class of the on icon. */
        iconOnClass?: string;

        /** Inline style of the on icon. */
        iconOnStyle?: any;

        /** Style class of the off icon. */
        iconOffClass?: string;

        /** Inline style of the off icon. */
        iconOffStyle?: any;

        /** Style class of the cancel icon. */
        iconCancelClass?: string;

        /** Inline style of the cancel icon. */
        iconCancelStyle?: any;

        /** Number of stars. */
        stars?: number;

        /** cancel rating custom HTML */
        cancelIconHTML?: string;
        onIconHTML?: string;
        offIconHTML?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterRatingAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // ratingSettings : end

    // radioSettings : start
    radioSettings?: {
        displayType?: 'inline' | 'new_line';
        displayInCenter?: boolean;
        options: { label: string; value: any }[];

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterRadioAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // radioSettings : end

    // datePickerSettings : start
    /** It's value will be Date object. */
    datePickerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showSeconds?: boolean;
        showTime?: boolean;

        /** Default : 24 */
        hourFormat?: '12' | '24';

        /** ex: dd-MM-yyyy hh:mm:ss a */
        dateTimeFormat?: string;

        /** Whether to display timepicker only. Use hourFormat 12 to display AM/PM in UI. */
        timeOnly?: boolean;

        /** The minimum selectable date. */
        minDate?: Date;

        /** The maximum selectable date. */
        maxDate?: Date;

        /**
         * Default : date
         * Update dateTimeFormat for 'month'(MM-yyyy) & 'year'(yyyy) values.
         */
        view?: 'date' | 'month' | 'year';

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterDatePickerAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // datePickerSettings : end

    // colorPickerSettings : start
    colorPickerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        format?: 'hex' | 'rgb' | 'hsb';

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterColorPickerAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // colorPickerSettings : end

    // dropdownSettings : start
    dropdownSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showClear?: boolean;
        dataSource: 'static_data' | 'db_data' | 'api_call'; // custom_code = We can call any API in that.

        /** it will use used when dataSource is 'static_data'. */
        staticData?: any[]; // { label: string; value: any; }[] works default.

        /**
         * it can pickup IDB values from schema also.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /** Default : label */
        optionLabel?: string;

        /** Default : value */
        optionValue?: string;

        filter?: boolean;

        /** one field or multiple comma separated fields are supported without any space in between. */
        filterBy?: string;

        filterMatchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

        /** Default : false, if true it will get latest data when form opens for add/edit operation. */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /** Default : false, Make it true to handle huge amount of data. */
        virtualScroll?: boolean;

        /** on value change of current dropdown | auto complete | multi select, it will change values of these dropdowns | auto completes | multi selects and reload them. */
        reloadDropdownsOfPath?: string[];

        /** API call will happen when these values of path are present in formData */
        isDependentOnPath?: string[];

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * modifyDropdownRequest = It will run before hitting API call. So we can do whatever we want.<br/>
             * onceDropdownDataLoaded = Execute code when dropdown data is loaded.<br/>
             *
             * Available variables:<br/>
             * reqBody: IQueryFormat | any. Useful to modify apiCallOverrides also,<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * dropdownData: any[] = Latest loaded dropdown data<br/>
             * reloadDropdownsOfPath: string[] = Add path to this variable to reload its dropdown data.<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent.<br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             */
            appendTo: EDBMasterDropdownAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,

        }[],

        addNewFormConfig?: IDBMasterConfig;

        apiCallOverrides?: IDBMasterAPICallOverrides;
    };
    // dropdownSettings : end

    // autocompleteSettings : start
    autocompleteSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showClear?: boolean;

        /** Minimum number of characters to initiate a search. */
        minLengthForSearch?: number;

        /** Delay between keystrokes to wait before sending a query. */
        delay?: number;

        /** When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions. */
        forceSelection?: number;

        dataSource: 'static_data' | 'db_data' | 'api_call'; // custom_code = We can call any API in that.

        /** it will use used when dataSource is 'static_data'. */
        staticData?: any[]; // { label: string; value: any; }[] works default.

        /**
         * it can pickup IDB values from schema also.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /** Default : label */
        optionLabel?: string;

        /** Default : value */
        // optionValue?: string;

        /** one field or multiple comma separated fields are supported without any space in between. */
        filterBy?: string;
        filterMatchMode?: 'contains' | 'startsWith' | 'endsWith';

        /** Default : false, if true it will get latest data when form opens for add/edit operation. */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /** Default : false, Make it true to handle huge amount of data. */
        virtualScroll?: boolean;

        /** on value change of current dropdown | auto complete | multi select, it will change values of these dropdowns | auto completes | multi selects and reload them. */
        reloadDropdownsOfPath?: string[];

        /** API call will happen when these values of path are present in formData */
        isDependentOnPath?: string[];

        /** Displays a button next to the input field when enabled. */
        dropdown?: boolean;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Maximum number of character allows in the input field. */
        maxLength?: number;

        addNewFormConfig?: IDBMasterConfig;

        apiCallOverrides?: IDBMasterAPICallOverrides;

        jsCode?: {
            /**
             * modifyDropdownRequest = It will run before hitting API call. So we can do whatever we want.<br/>
             * onceDropdownDataLoaded = Execute code when dropdown data is loaded.<br/>
             *
             * Available variables:<br/>
             * reqBody: IQueryFormat | any. Useful to modify apiCallOverrides also,<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * dropdownData: any[] = Latest loaded dropdown data<br/>
             * reloadDropdownsOfPath: string[] = Add path to this variable to reload its dropdown data.<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent.<br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             */
            appendTo: EDBMasterAutoCompleteAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,

        }[],

    };
    // autocompleteSettings : end

    // multiselectSettings : start
    multiselectSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        placeholder?: string;
        showClear?: boolean;

        /** Minimum number of characters to initiate a search. */
        minLength?: number;

        /** Delay between keystrokes to wait before sending a query. */
        delay?: number;

        dataSource: 'static_data' | 'db_data' | 'api_call'; // custom_code = We can call any API in that.

        /** it will use used when dataSource is 'static_data'. */
        staticData?: any[]; // { label: string; value: any; }[] works default.

        /**
         * it can pickup IDB values from schema also.
         */
        dbData?: Partial<Pick<ICollectionIdentity, 'instance' | 'database' | 'collection' | 'table'>
            & Pick<IQueryFormat, 'find' | 'select' | 'limit' | 'deep' | 'sort'>>;

        /** Default : label */
        optionLabel?: string;

        /** Default : value */
        optionValue?: string;

        /** Whether to show the header. */
        showHeader?: boolean;

        /** Enable filter */
        filter?: boolean;

        /** one field or multiple comma separated fields are supported without any space in between. */
        filterBy?: string;

        /** Default: 'contains', Defines how the items are filtered.  */
        filterMatchMode?: 'endsWith' | 'startsWith' | 'contains' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

        /** Default : false, if true it will get latest data when form opens for add/edit operation. */
        alwaysGetLatestDataOnFormOpen?: boolean;

        /** Default : false, Make it true to handle huge amount of data. */
        virtualScroll?: boolean;

        /** Decides how many selected item labels to show at most. */
        maxSelectedLabels?: number;

        /** Decides how many items can be selected at most. */
        selectionLimit?: number;

        /** Ex: "{0} items selected", Label to display after exceeding max selected labels. defaults "ellipsis" keyword to indicate a text-overflow. */
        selectedItemsLabel?: string;

        /** Whether to show the checkbox at header to toggle all items at once. */
        showToggleAll?: boolean;

        /** Name of the disabled field of an option. */
        optionDisabled?: string;

        /** Name of the label field of an option group. */
        optionGroupLabel?: string;

        /** Name of the options field of an option group. */
        optionGroupChildren?: string;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /**
         * Defines how the selected items are displayed.
         * @group Props
         */
        display: 'comma' | 'chip';

        /** on value change of current dropdown | auto complete | multi select, it will change values of these dropdowns | auto completes | multi selects and reload them. */
        reloadDropdownsOfPath?: string[];

        /** API call will happen when these values of path are present in formData */
        isDependentOnPath?: string[];

        addNewFormConfig?: IDBMasterConfig;

        apiCallOverrides?: IDBMasterAPICallOverrides;

        jsCode?: {
            /**
             * modifyDropdownRequest = It will run before hitting API call. So we can do whatever we want.<br/>
             * onceDropdownDataLoaded = Execute code when dropdown data is loaded.<br/>
             *
             * Available variables:<br/>
             * reqBody: IQueryFormat | any. Useful to modify apiCallOverrides also,<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * dropdownData: any[] = Latest loaded dropdown data<br/>
             * reloadDropdownsOfPath: string[] = Add path to this variable to reload its dropdown data.<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent.<br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             */
            appendTo: EDBMasterMultiSelectAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,

        }[],

    };
    // multiselectSettings : end

    // fileUploadSettings : start
    fileUploadSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Default : false, When enabled, upload begins automatically after selection is completed. */
        auto?: boolean;

        /**
         * API URL which will be used to upload files.<br/>
         * API should return array of objects in below format.<br/>
         * You can have other properties and below properties are required.
         * [{
         *     originalName: string,
         *     uploadPath: string,
         * }]
         * API Maker's custom API will accept files in "files" form data field.
         *
         * */
        uploadApiUrl: string;
        /** API URL which returns content of file in base64 format. */
        downloadApiUrl?: string;
        removeApiUrl?: string;

        /** Allow to select multiple files or not */
        multiple?: boolean;

        /** ex : image/* */
        accept?: string;

        /** Maximum file size allowed in bytes. Default : 10000000 (10MB) */
        maxFileSize?: number;

        /** Maximum number of files that can be uploaded. */
        fileLimit?: number;

        /** Internal use property to show/hide upload button on UI control. */
        _showUploadButton?: boolean;

        /** internal use only */
        _fileSelectEvent?: any;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;
    };
    // fileUploadSettings : end

    // dividerSettings : start
    dividerSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        align?: 'center' | 'left' | 'right' | 'bottom' | 'top';
        type?: 'dashed' | 'dotted' | 'solid';
        dividerText?: string;
    };
    // dividerSettings : end

    // accordionSettings : start
    accordionSettings?: {
        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Index of the active tab or an array of indexes in multiple mode. */
        activeIndex?: number | number[];

        /** Default : 0, When form opens, this will be applied. */
        defaultIndex?: number;

        multiple?: boolean;
        tabs: {
            /** Give style object in angular style. */
            style?: any;

            /** Tab header, HTML is supported. */
            header: string;

            /** Give style object in angular style. */
            headerStyle?: any;

            /** You can provide single or multiple classes. */
            headerCssClass?: string,

            disabled?: boolean | string;
            fields: IDBMasterConfigFormField[][];
        }[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterAccordionAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // accordionSettings : end

    // tabViewSettings : start
    tabViewSettings?: {
        /** Index of the active tab to change selected tab programmatically. */
        activeIndex?: number;

        /** Default : 0, When form opens, this will be applied. */
        defaultIndex?: number;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        tabs: {
            /** Give style object in angular style. */
            style?: any;

            /** Tab header, HTML is supported. */
            header: string;

            /** Give style object in angular style. */
            headerStyle?: any;

            /** You can provide single or multiple classes. */
            headerCssClass?: string,

            disabled?: boolean;
            fields: IDBMasterConfigFormField[][];
        }[];

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterTabViewAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // tabViewSettings : end

    // buttonSettings : start
    buttonSettings?: {
        /** button label text */
        label: string;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** Add a link style to the button. */
        link?: boolean;

        /** ex: pi pi-check , give icon to button */
        icon?: string,

        /** default : left */
        iconPos?: 'left' | 'right' | 'top' | 'bottom';

        /** Whether the button is in loading state. */
        loading?: boolean;

        /** Icon to display in loading state. */
        loadingIcon?: string;

        /** Defines the style of the button. */
        severity?: uiMakerComponentSeverity | null | undefined;

        /** Add a shadow to indicate elevation. */
        raised?: boolean;

        /** Add a circular border radius to the button. */
        rounded?: boolean;

        /** Add a textual class to the button without a background initially. */
        text?: boolean;

        /** Add a border class without a background initially. */
        outlined?: boolean;

        /** Value of the badge. */
        badge?: string;

        /** Style class of the badge. */
        badgeClass?: string;

        /** Style class of the badge. */
        size?: 'small' | 'large' | undefined | null;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterButtonAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // buttonSettings : end

    // imageSettings : start
    imageSettings?: {
        src: string;

        /** Give style object in angular style. */
        style?: any;

        /** custom CSS class to assign to control */
        cssClass?: string,

        /** it will be assigned to span which is parent of image tag. */
        imageParentSpanClass?: string,

        /** Attribute of the image element. */
        width?: string;

        /** Attribute of the image element. */
        height?: string;

        /** Attribute of the preview image element. */
        alt?: string;

        /** Controls the preview functionality. */
        preview?: boolean;

        /** The source path for the preview image. */
        previewImageSrc?: string;

        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterImageAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // imageSettings : end

    // customHTMLSettings : start
    customHTMLSettings?: {
        htmlCode: string;
    };
    // customHTMLSettings : end

    // knobSettings : start
    knobSettings?: {
        /** Advisory information to display in a tooltip on hover. */
        tooltip?: string;

        /** Type of CSS position. */
        tooltipPosition?: 'left' | 'top' | 'bottom' | 'right';
        tooltipStyleClass?: string;

        /** Style class of the component. */
        cssClass?: string | undefined;

        /** Inline style of the component. */
        style?: any;

        /** Background of the value. */
        valueColor?: string | undefined;

        /** Background color of the range. */
        rangeColor?: string;

        /** Color of the value text. */
        textColor?: string;

        /** Template string of the value. */
        valueTemplate?: string;

        /** Size of the component in pixels. */
        size?: number;

        /** Step factor to increment/decrement the value. */
        step?: number;

        /** Minimum boundary value. */
        min?: number;

        /** Maximum boundary value. */
        max?: number;

        /** Width of the knob stroke. */
        strokeWidth?: number;

        jsCode?: {
            /**
             * Available variables:<br/>
             * formData: any = Entire form object<br/>
             * column: IDBMasterConfigFormField = Configuration of that form column. column.dropdownSettings?.dbData?.find will be query to get data. <br/>
             * allDropdownDataMap: {[path: string]: any[]} = Map of all dropdown data<br/>
             * globalData: any = User will send it using SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT event from parent. <br/>
             * utils: any = Common utility functions for user to use. <br/>
             * queryParams: any = Query params received from URL. <br/>
             * config: IDBMasterConfigFormField <br/>
             * event: any <br/>
             */
            appendTo: EDBMasterKnobAppendTo,
            /**
             * // dropdownData is available to use.
             *
             * // Return promise for long awaiting tasks.
             * new Promise(async (resolve, reject) => {
             *     await new Promise(r => setTimeout(r, 3000));
             *     dropdownData[0].name = 'Sample data';
             *     resolve();
             * });
             *
             * // Directly modify data of grid
             * dropdownData[0].name = 'Sample data';
             *
             * // Return function
             * (function setData() { dropdownData[0].name = 'Sample data'; } );
             *
             */
            code: string,
        }[],
    };
    // knobSettings : end

// genericConfig : start
}

// genericConfig : end

// genericConfig : start
export interface IPropertyValidation {
    required?: boolean; // Allowed Types : *
    min?: number; // Allowed Types : number | date
    max?: number; // Allowed Types : number | date
    minLength?: number; // Allowed Types : string
    maxLength?: number; // Allowed Types : string
    /**
     * @deprecated API Maker maintains unique feature and do not use on table which has frequent updates.
     */
    unique?: boolean;
    email?: boolean; // Allowed Types : string
    validatorFun?: Function;

    /** If value is present it should be from this array. */
    enum?: any[];
}

// genericConfig : end

// dropdownSettings : start
export enum EDBMasterDropdownAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    modifyDropdownRequest = 'modifyDropdownRequest',
    onceDropdownDataLoaded = 'onceDropdownDataLoaded',
    onChange = 'onChange',
}

// dropdownSettings : end

// autocompleteSettings : start
export enum EDBMasterAutoCompleteAppendTo {
    onSelect = 'onSelect',
    visible = 'visible',
    disabled = 'disabled',
    modifyAutoCompleteRequest = 'modifyAutoCompleteRequest',
    onceAutoCompleteDataLoaded = 'onceAutoCompleteDataLoaded',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
    onShow = 'onShow',
    onHide = 'onHide',
    onClear = 'onClear',
    onDropdownClick = 'onDropdownClick',
}

// autocompleteSettings : end

// multiselectSettings : start
export enum EDBMasterMultiSelectAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    modifyMultiSelectRequest = 'modifyMultiSelectRequest',
    onceMultiSelectDataLoaded = 'onceMultiSelectDataLoaded',
    onChange = 'onChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
    onClear = 'onClear',
    onSelectAllChange = 'onSelectAllChange',
}

// multiselectSettings : end

// inputTextSettings : start
export enum EDBMasterInputTextAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputTextSettings : end

// inputOtpSettings : start
export enum EDBMasterInputOtpAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// inputOtpSettings : end

// buttonSettings : start
export enum EDBMasterButtonAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    click = 'click',
}

// buttonSettings : end

// imageSettings : start
export enum EDBMasterImageAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    click = 'click',
}

// imageSettings : end

// inputNumberSettings : start
export enum EDBMasterInputNumberAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputNumberSettings : end

// tabViewSettings : start
export enum EDBMasterTabViewAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    activeIndexChange = 'activeIndexChange',
}

// tabViewSettings : end

// dividerSettings : start
export enum EDBMasterDividerAppendTo {
    visible = 'visible',
}

// dividerSettings : end

// accordionSettings : start
export enum EDBMasterAccordionAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    activeIndexChange = 'activeIndexChange',
}

// accordionSettings : end

// customHTMLSettings : start
export enum EDBMasterCustomHtmlAppendTo {
    visible = 'visible',
}

// customHTMLSettings : end

// inputMaskSettings : start
export enum EDBMasterInputMaskAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',

    /** If you are trying to modify model value in blur it will not work. It is old bug in PrimeNG. Use complete method instead. */
    blur = 'blur',
    complete = 'complete',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputMaskSettings : end

// inputPasswordSettings : start
export enum EDBMasterInputPasswordAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// inputPasswordSettings : end

// textAreaSettings : start
export enum EDBMasterTextAreaAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// textAreaSettings : end

// editorSettings : start
export enum EDBMasterEditorAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    onTextChange = 'onTextChange',
    onInit = 'onInit',
    onSelectionChange = 'onSelectionChange',
    focus = 'focus',
    blur = 'blur',
    keyUp = 'keyUp',
    keyDown = 'keyDown',
}

// editorSettings : end

// checkboxSettings : start
export enum EDBMasterCheckboxAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// checkboxSettings : end

// ratingSettings : start
export enum EDBMasterRatingAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    onRate = 'onRate',
    onCancel = 'onCancel',
    onFocus = 'onFocus',
    onBlur = 'onBlur',
}

// ratingSettings : end

// knobSettings : start
export enum EDBMasterKnobAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// knobSettings : end

// radioSettings : start
export enum EDBMasterRadioAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// radioSettings : end

// colorPickerSettings : start
export enum EDBMasterColorPickerAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
}

// colorPickerSettings : end

// datePickerSettings : start
export enum EDBMasterDatePickerAppendTo {
    visible = 'visible',
    disabled = 'disabled',
    ngModelChange = 'ngModelChange',
    focus = 'focus',
    blur = 'blur',
}

// datePickerSettings : end

// fileUploadSettings : start
export enum EDBMasterFileUploadAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// fileUploadSettings : end

// gridSettings : start
export enum EDBMasterGridAppendTo {
    visible = 'visible',
    disabled = 'disabled',
}

// gridSettings : end

export enum EDBMasterConfigAppendTo {
    /** Code will be run only once on page load. config and global data are not available. It will append script to page script tag. */
    oncePageLoad = 'oncePageLoad',

    /** Code will be run only once on page load with context of data. (config, globalData: any, utils: any, queryParams: any) */
    oncePageLoadWithContext = 'oncePageLoadWithContext',

    /** Gets executed everytime grid gets data. (gridEvent, gridData, globalData: any, utils: any, queryParams: any) */
    gridRender = 'gridRender',

    /** You can modify api call request. (gridEvent, reqBody: IQueryFormat, globalData: any, utils: any, queryParams: any) */
    modifyGridRequest = 'modifyGridRequest',

    /** Executed once grid data loaded. */
    onceGridDataLoaded = 'onceGridDataLoaded',

    /** run code before save & edit operation of form. Change data before saving/update/import. (reqBody: any | any[], globalData: any, utils: any, queryParams: any, mode: 'save' | 'edit' | 'import') */
    preSaveAndEdit = 'preSaveAndEdit',

    /** Change data before save modal open. (formData: any , globalData: any, utils: any, queryParams: any) */
    beforeSaveModalOpen = 'beforeSaveModalOpen',

    /** Change data before edit modal open. (formData: any , globalData: any, utils: any, queryParams: any) */
    beforeEditModalOpen = 'beforeEditModalOpen',
    beforeViewModalOpen = 'beforeViewModalOpen',
    columnSelectionChanged = 'columnSelectionChanged',

    /** this code will be executed just before making CSV file from data. (gridData will have CSV data) */
    processDataBeforeExport = 'processDataBeforeExport',
}

// genericConfig : start
export enum EDBMasterFormControl {
    input = 'input',
    inputNumber = 'inputNumber',
    inputMask = 'inputMask',
    inputOtp = 'inputOtp',
    password = 'password',
    date_picker = 'date_picker',
    textarea = 'textarea',
    editor = 'editor',
    checkbox = 'checkbox',
    radio = 'radio',
    color_picker = 'color_picker',
    dropdown = 'dropdown',
    auto_complete = 'auto_complete',
    multi_select = 'multi_select',
    file_upload = 'file_upload',
    grid = 'grid',
    divider = 'divider',
    rating = 'rating',
    knob = 'knob',

    // Field holder controls
    accordion = 'accordion',
    tab_view = 'tab_view',

    // utility controls
    button = 'button',
    image = 'image',
    customHTML = 'customHTML',
}

export enum EDBMasterCustomActionButtonAppendTo {
    click = 'click',
}

// genericConfig : end

export interface IDBMasterMessageFromIframeToParent {
    fromDBMaster: string;
    eventType: IDBMasterEventFromIframeToParent;
    eventData: any;
}

export interface IDBMasterMessageFromParentToIframe {
    eventType: IDBMasterEventFromParentToIframe;
    eventData: any;
}

/**
 * Iframe parent will receive these events via messages.
 */
export enum IDBMasterEventFromIframeToParent {
    PAGE_READY = 'PAGE_READY',
    RECORD_SAVED = 'RECORD_SAVED',
    RECORDS_IMPORTED = 'RECORDS_IMPORTED',
    RECORD_UPDATED = 'RECORD_UPDATED',
    RECORD_DELETED = 'RECORD_DELETED',
    MANY_RECORD_DELETED = 'MANY_RECORD_DELETED',
    GRID_EXPORTED = 'GRID_EXPORTED',
    GRID_REFRESHED = 'GRID_REFRESHED',
    ADD_NEW_BUTTON_CLICKED = 'ADD_NEW_BUTTON_CLICKED',
    CLOSE_BUTTON_CLICKED = 'CLOSE_BUTTON_CLICKED',
    CUSTOM_ACTION_BUTTON_CLICKED = 'CUSTOM_ACTION_BUTTON_CLICKED',
    DROPDOWN_ADD_NEW_RECORD_SAVED = 'DROPDOWN_ADD_NEW_RECORD_SAVED',
    DOUBLE_CLICK_GRID_EVENT = 'DOUBLE_CLICK_GRID_EVENT',
    CLICK_GRID_EVENT = 'CLICK_GRID_EVENT',
}

/**
 * Iframe parent can send these messages to UI Page via message.
 */
export enum IDBMasterEventFromParentToIframe {
    /** You can trigger add button click. */
    TRIGGER_ADD_NEW_BUTTON_CLICK = 'TRIGGER_ADD_NEW_BUTTON_CLICK',

    /** You can trigger refresh button click of grid. */
    TRIGGER_REFRESH_BUTTON_CLICK = 'TRIGGER_REFRESH_BUTTON_CLICK',

    /** Need to pass object and those properties will be sent in grid load query. */
    DATA_TO_APPEND_IN_GRID_LOAD_FIND_QUERY = 'DATA_TO_APPEND_IN_GRID_LOAD_FIND_QUERY',

    /** Need to pass object and those properties will be sent in SAVE API call. */
    DATA_TO_APPEND_IN_RECORD_SAVE_API_PAYLOAD = 'DATA_TO_APPEND_IN_RECORD_SAVE_API_PAYLOAD',

    /** Need to pass object and those properties will be sent in Update API call. */
    DATA_TO_APPEND_IN_RECORD_UPDATE_API_PAYLOAD = 'DATA_TO_APPEND_IN_RECORD_UPDATE_API_PAYLOAD',

    /** Pass object which will be used in global variable named "globalData" in custom code. */
    SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT = 'SET_GLOBAL_DATA_TO_USE_IN_ANY_SCRIPT',

    /** Send message to iframe when you are done with setting required data in globalData or other required places. */
    PARENT_READY = 'PARENT_READY', // parent will send message when it is ready with grid conditions.
}

export interface IDBMasterUIPageUtilsScope {
    globalData: any;
    utils: {
        schema: any;
        dbMaser: any;
        errorsMap: { [path: string]: string };
        messageService: {
            showErrorToast(msg: string, otherProps?: any): void;
            showSuccessToast(msg: string, otherProps?: any): void;
            showInfoToast(msg: string, otherProps?: any): void;
            showWarningToast(msg: string, otherProps?: any): void;
        }

        /** Add | Edit | Delete | View | Refresh Grid operations */
        operations: {
            /** Reload grid data. */
            refreshGrid(): Promise<void>;

            /** Opens form in add mode. */
            openFormInAddMode(): Promise<void>;

            /** Opens modal in edit mode with data filled in it. */
            openFormInEditMode(id: any): Promise<void>;

            /** Opens modal in view mode with data filled in it. */
            openFormInViewMode(id: any): Promise<void>;

            /** Without any confirmation it will directly perform delete operation of given id. */
            deleteRecord(id: any): Promise<void>;
        }

        /**
         * form fields are in nested form, it returns simple array of form fields.
         * It will not include fields from grid control as they are having different form and grid control itself is a form.
         * It will include all fields of accordion, tab controls.
         * It will include fields having path property.
         * */
        getFlatArrayOfAllFormFields(
            fields: IDBMasterConfigFormField[][]
        ): Promise<IDBMasterConfigFormField[]>;

        /**
         * form fields are in nested form, it returns simple array of form fields.
         * It will also include form fields from grid control.
         * It will include all fields of accordion, tab controls.
         * */
        getFlatArrayOfAllFormFieldsIncludingGridFields(
            fields: IDBMasterConfigFormField[][]
        ): Promise<IDBMasterConfigFormField[]>;

        /** It finds form element having that path.
         * It will also check into grid form fields.
         * It can find element having hiddenId
         * */
        findFormElement(pathOrHiddenId: string): IDBMasterConfigFormField | undefined;

        /**
         * It will return list of all controls provided in arguments.
         * */
        findFormElementOfControl(control: EDBMasterFormControl): IDBMasterConfigFormField[];

        /** It finds grid element having that path. */
        findGridElement(path: string): IDBMasterConfigGridField | undefined;

        /** You can set value in any filter and it will trigger filter automatically on that field. */
        setValueInFilterOfTopGrid(path: string, value: any): void;

        /**
         * It will convert array of objects into CSV string<br/>
         * papaUnparseOptions = https://www.papaparse.com/docs#unparse-config-default
         * */
        convertArrayToCSV(dataArr: any[], papaUnparseOptions?: any): string;

        /**
         * It will throw file to user for download.<br/>
         * fileContent ex = "Some file content"
         * filename ex. = clients.csv
         * fileType ex. = text/csv
         * */
        download(fileContent: string, filename: string, fileType: string): void;

        /**
         * Useful to clear all properties of object and assign all properties of new object without changing object reference.
         * Use this function to set new value to $scope.<br/>
         * ex:<br/>
         * const someNewApiResponse = $scope.apiResponse;<br/>
         * $scope.utils.setDataInObject($scope.apiResponse, someNewApiResponse);<br/>
         * */
        setDataInObject(oldObject: any, newObject: any): void;

        /**
         * Useful to remove all objects of array and put new objects from new array without changing object reference.
         * Use this function to set new value to $scope.<br/>
         * ex:<br/>
         * const someNewApiResponse = $scope.apiResponse;<br/>
         * $scope.utils.setDataInArray($scope.apiResponse, someNewApiResponse);<br/>
         * */
        setDataInArray(oldArray: any[], newArray: any[]): void;
    };
    queryParams: any;
    userUtils: { [utilName: string]: any };
    event: any | null;
    config: IDBMasterConfig | null;
    column: IDBMasterConfigFormField | null;

    /**
     * It will be the object of parentFormData & grandParentFormData.<br/>
     * If you make change in any value, it will be changed automatically in their respective UI.<br/>
     * You can use it for validation purpose also.
     * */
    parentFormData: any | null;
    formData: any | null;
    allDropdownDataMap: { [path: string]: any[] } | null;
    reqBody: any | null;
    gridData: any[] | null;
    dropdownData: any[] | null;
    reloadDropdownsOfPath: string[] | null;
    mode: 'save' | 'edit' | 'view' | 'import' | null,
    apiResponse: any | null;
    headers: any | null;
    selectedGridItems: any | null;

    /** It will be available in case of EDBMasterConfigAppendTo.beforeSaveModalOpen */
    getByIdResp: any | null;
    env: {
        BE_HOST_PORT: string,
    }
}

/**
 * If you want to hide custom action provide below property
 * ____hide_actionName = true
 */
export enum EDBMasterSpecialRowProperties {
    /** if this property found in row with truthy value, it will hide delete button for that row even if that is supported. */
    ____hide_delete_button = '____hide_delete_button',

    /** if this property found in row with truthy value, it will hide edit button for that row even if that is supported. */
    ____hide_edit_button = '____hide_edit_button',

    /** if this property found in row with truthy value, it will hide view button for that row even if that is supported. */
    ____hide_view_button = '____hide_view_button',
}

// ==== DB Master configurations End ====
