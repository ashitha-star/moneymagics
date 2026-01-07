import * as T from 'types';
import * as C from 'utils/Constants';

async function main(g: T.IAMGlobal) {

    const product = g.req.output;     
    const body = g.req.body;           
    console.log(product.id)

    if (!body.c) return {};

    await g.sys.db.saveSingleOrMultiple({
        instance: C.instance,
        database: C.db,
        collection: "public.product_composition",
        saveData: {
            product_id: product.id,                   
            raw_material_id: body.c.raw_material_id,
            quantity_used: body.c.quantity_used
        }
    });

    return {};
}

module.exports = main;