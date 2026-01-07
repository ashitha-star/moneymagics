// import * as T from 'types';
// import * as db from 'db-interfaces';

// async function main(g: T.IAMGlobal) {
//     // g.req.body = modify/validate request body in pre hooks
//     // g.req.output = modify/assign response in post hooks

//     // if you return from pre/post hook, it will be returned as response and it will stop execution.
//     // for stream APIs we can not return response to user from post hook because API response is already sent.
//     // return { hello: 'world' };
// };
// module.exports = main;



async function main(g: T.IAMGlobal) {
  const output = g.req.output;
  const quote = Array.isArray(output) ? output[0] : output;

  if (!quote?.customer_id) return g.req.output;

  const customer = await g.sys.db.party.findOne({
    where: { id: quote.customer_id }
  });

  if (!customer?.email) return g.req.output;

  const html = salesQuoteHTML({
    company: {
      name: 'My Company',
      address: '',
      city: ''
    },
    customer,
    quote: {
      number: quote.quote_number,
      name: quote.quote_name,
      date: quote.quote_date,
      expiry: quote.expiry_date
    },
    items: [],
    subtotal: quote.total_amount,
    tax: 0,
    total: quote.total_amount
  });

  await g.sys.system.sendEmail({
    to: customer.email,
    subject: `Sales Quote - ${quote.quote_number}`,
    html
  });

  return {
    ...g.req.output
  };
}

export default main;