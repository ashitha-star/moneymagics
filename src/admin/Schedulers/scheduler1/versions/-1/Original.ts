import * as T from 'types';
import * as db from 'db-interfaces';


async function main(g: T.IAMGlobal) {
    const users = await g.sys.db.getAll({
        instance: "test 1",
        database: 'employee8_db',
        collection: "public.users",
    });

    return users;
}

module.exports = main;