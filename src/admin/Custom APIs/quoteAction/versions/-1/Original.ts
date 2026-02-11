import * as C from 'utils/Constants';
const statusMap = {
  accept: 'ACCEPTED',      
  reject: 'REJECTED'
};

async function quoteAction(g: T.IAMGlobal) {
  try {
    const ref = g.req?.query?.ref;
    const action = g.req?.query?.action;

    console.log("QUERY >>>", { ref, action });

    if (!ref || !['accept', 'reject'].includes(action)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<h3>Invalid request</h3><p>Missing ref or action.</p>'
      };
    }

    const quote = await g.sys.db.getById({
      instance: C.instance,
      database: C.db,
      collection: 'sales_quote',
      id: ref,
      primaryKey: 'referral_id'
    });

    console.log("QUOTE >>>", quote);

    if (!quote) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: '<h3>Quote not found</h3>'
      };
    }

    const newStatus = statusMap[action];

    if (quote.status === newStatus) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: `<h2>Quote is already ${newStatus}</h2><p>You may close this window.</p>`
      };
    }

    await g.sys.db.updateById({
      instance: C.instance,
      database: C.db,
      collection: 'sales_quote',
      id: ref,
      primaryKey: 'referral_id',
      updateData: { status: newStatus }
    });

    const quote1 = await g.sys.db.getById({
      instance: C.instance,
      database: C.db,
      collection: 'sales_quote',
      id: ref,
      primaryKey: 'referral_id'
    });

    console.log("QUOTE >>>", quote1);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<h2>Quote ${newStatus}</h2><p>You may close this window.</p>`
    };

  } catch (err) {
    console.error("QUOTE ACTION ERROR >>>", err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<h3>Something went wrong</h3>'
    };
  }
}

module.exports = quoteAction;