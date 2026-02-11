import * as T from 'types';

const instanceName = 'test1';
const databaseName = 'moneymagics_db';
const tableName = 'public.users';
const userNameColumn = 'email';
const passwordColumn = 'password';
const userTypeColumn = 'userType';


async function main(g: T.IAMGlobal) {

  const userNameFromRequest = g.req.body.username || null;
  const passwordFromRequest = g.req.body.password || null;

  if (!userNameFromRequest || !passwordFromRequest) {
    throw new Error('Username and password required');
  }

  console.log('Request body:', g.req.body);


  // 1. Fetch user from DB
  const userData: any = await g.sys.db.getById({
    instance: instanceName,
    database: databaseName,
    collection: tableName,
    primaryKey: userNameColumn,
    id: userNameFromRequest,
  });

  if (!userData ) {
    throw new Error('Invalid credentials');
  }

  // 2. Handle encrypted / plain password
  const encryptSecret = await g.sys.system.getSecret("common.secret");

  let decryptedPass: any = null;

  if (userData[passwordColumn]) {
    try {
      decryptedPass = await g.sys.system.decrypt(
        userData[passwordColumn],
        T.EEncryptionAlgorithm.AES,
        encryptSecret
      );
    } catch {
      decryptedPass = userData[passwordColumn]; // plaintext fallback
    }
  }
    // g.logger.log(decryptedPass, passwordFromRequest)

  // 3. Get AM user credentials
  const adminUserName = userData[userTypeColumn];
  if (!adminUserName) {
    throw new Error('User type not assigned');
  }

  const adminUserPass = await g.sys.system.getSecret(
    "common.apiUserPasswords." + adminUserName
  );

  if (!adminUserPass) {
    throw new Error(`AM password not found for userType: ${adminUserName}`);
  }

  // 4. Generate tokens
  const outputArr = await g.sys.system.getToken([
    {
      authTokenType: T.EAuthTokenType.AM,
      authTokenAM: {
        u: adminUserName,
        p: adminUserPass
      }
    },
    {
      authTokenType: T.EAuthTokenType.AM_DB,
      authTokenAMDB: {
        instance: instanceName,
        database: databaseName,
        collection: tableName,
        usernameColumn: userNameColumn,
        passwordColumn: passwordColumn,
        u: userNameFromRequest,
        p: passwordFromRequest
      }
    }
  ]);


  // 6. Shape response (like Django serializer)
  const userResponse = {
    id: userData.id,
    username: userData.username,
    email: userData.email
  };

 g.logger.log('USER DATA:', userData);
  return {
    amToken: outputArr[0],
    amDbToken: outputArr[1],
    user: userResponse
  };
}

module.exports = main;