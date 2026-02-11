const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // Fetch products
    const products = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.products",
    });

    // Fetch product composition
    const compositions = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.product_composition",
    });

    // Fetch raw materials
    const rawMaterials = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.raw_materials",
    });

    // Build rawMaterialId → name map
    const rawMaterialMap = {};
    (rawMaterials || []).forEach(rm => {
        rawMaterialMap[rm.id] = rm.name;
    });

    // Build productId → composition string map
    const compositionMap = {};

    (compositions || []).forEach(comp => {
        const materialName = rawMaterialMap[comp.raw_material_id];
        if (!materialName) return;

        const entry = `${materialName} * ${comp.quantity_used}`;

        if (!compositionMap[comp.product_id]) {
            compositionMap[comp.product_id] = [];
        }

        compositionMap[comp.product_id].push(entry);
    });

    // Attach composition to products
    const data = (products || []).map(product => ({
        ...product,
        composition: compositionMap[product.id]
            ? compositionMap[product.id].join(", ")
            : "-"
    }));

    // Excel headers
    const headers = [
        { key: "name", label: "Name" },
        { key: "quantity", label: "Quantity" },
        { key: "cost_price", label: "Cost Price" },
        { key: "selling_price", label: "Selling Price" },
        { key: "composition", label: "Composition" }
    ];

    // Generate & save Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "products.xlsx"
    });

    // Return Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "products.xlsx"
    };
};