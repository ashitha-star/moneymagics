import * as T from 'types';

async function main(g: T.IAMGlobal) {
  const entity = (g.req.body?.entity || g.req.query?.entity)?.toLowerCase();

  if (!entity) {
    return {
      success: false,
      error: 'entity is required'
    };
  }

  let fields: string[] = [];

  if (entity === 'customer' || entity === 'supplier') {
    fields = ['name', 'role', 'email', 'phone', 'address', 'default_account', 'currency', 'gst_reg',
         'gstin_no'];
  } 
  else if (entity === 'item' || entity === 'items') {
    fields = ['name', 'item_type', 'category', 'item_code', 'hsn_sac_code', 'unit', 'description', 
         'rate', 'tax', 'sales_account_id', 'purchase_account_id', 'min_order_quantity'];
         //min_order_quantity for purchase items only
  }

  return {
    success: true,
    entity,
    fields,
    count: fields.length
  };
}

module.exports = main;