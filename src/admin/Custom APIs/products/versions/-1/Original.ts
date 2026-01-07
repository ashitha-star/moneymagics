import * as C from 'utils/Constants';

async function main(g) {
  const body = g.req.body;

  const product = await g.sys.db.saveSingleOrMultiple({
    instance: C.instance,
    database: C.db,
    collection: "public.products",
    saveData: {
      name: body.name,
      quantity: body.quantity,
      cost_price: body.cost_price,
      selling_price: body.selling_price
    }
  });

  const productId =
    product?.id ||
    product?.data?.id ||
    product?.[0]?.id;

  if (!productId) {
    throw new Error("Product ID not generated");
  }

  if (Array.isArray(body.composition)) {
    for (const c of body.composition) {
      await g.sys.db.saveSingleOrMultiple({
        instance: C.instance,
        database: C.db,
        collection: "public.product_composition",
        saveData: {
          product_id: productId,
          raw_material_id: c.raw_material_id,
          quantity_used: c.quantity_used
        }
      });
    }
  }

  return {
    success: true,
    product_id: productId
  };
}

module.exports = main;