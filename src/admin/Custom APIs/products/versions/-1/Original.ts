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

    await g.sys.db.saveSingleOrMultiple({
        instance: C.instance,
        database: C.db,
        collection: "public.product_composition",
        saveData: body.composition.map(e=> {return {...e,product_id: productId}})
    });

    return {
        success: true,
        product_id: productId
    };
}

module.exports = main;

// import * as C from 'utils/Constants';

// async function main(g) {

//     const body = g.req.body;

//     const result = await g.sys.db.saveSingleOrMultiple({
//         instance: C.instance,
//         database: C.db,
//         collection: "public.product_composition",
//         saveData: {
//             raw_material_id: body.raw_material_id,
//             quantity_used: body.quantity_used,

//             product: {
//                 name: body.product.name,
//                 quantity: body.product.quantity,
//                 cost_price: body.product.cost_price,
//                 selling_price: body.product.selling_price
//             }
//         }
//     });

//     return {
//         success: true,
//         data: result
//     };
// }

// module.exports = main;