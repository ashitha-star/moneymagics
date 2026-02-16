const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // FETCH PRODUCTS WITH COMPOSITION + MATERIAL
    let result = await g.sys.db.query({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.products",
        deep: [
            {

                s_key: "composition",
                isMultiple: true,
                deep: [
                    {
                        s_key: "raw_material_id",
                        isMultiple: false,
                        select: "name,quantity"
                    }
                ]
            }
        ]
    });
    console.log(result)

    const products = Array.isArray(result)
        ? result
        : result?.data || [];

    // TRANSFORM TO EXCEL FORMAT
    const data = products.map(product => {

        const compositions = product.composition || [];

        const compositionText = compositions.length
            ? compositions
                .map(c => {
                    const materialName = c.raw_material_id?.name || "-";
                    return `${materialName} * ${c.quantity_used}`;
                })
                .join(", ")
            : "-";


        return {
            name: product.name,
            quantity: product.quantity,
            cost_price: product.cost_price,
            selling_price: product.selling_price,
            composition: compositionText
        };
    });

    // EXCEL HEADERS
    const headers = [
        { key: "name", label: "Name" },
        { key: "quantity", label: "Quantity" },
        { key: "cost_price", label: "Cost Price" },
        { key: "selling_price", label: "Selling Price" },
        { key: "composition", label: "Composition" }
    ];

    // GENERATE FILE
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "products.xlsx"
    });

    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "products.xlsx"
    };
};