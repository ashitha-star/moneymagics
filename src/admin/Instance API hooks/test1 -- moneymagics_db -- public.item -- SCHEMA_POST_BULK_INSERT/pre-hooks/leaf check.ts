import * as T from 'types';
import * as db from 'db-interfaces';

async function main(g: T.IAMGlobal) {
    const { sales_account_id, purchase_account_id } = g.req.body || {};
    console.log("Pre-hook body:", { sales_account_id, purchase_account_id });
    // g.req.body = modify/validate request body in pre hooks
    // g.req.output = modify/assign response in post hooks

    // if you return from pre/post hook, it will be returned as response and it will stop execution.
    // for stream APIs we can not return response to user from post hook because API response is already sent.
    // return { hello: 'world' };
};
module.exports = main;