const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // 1️⃣ Fetch raw materials
    const rawMaterials = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.raw_materials",
    });

    // 2️⃣ Fetch parties (suppliers)
    const parties = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.party",
    });

    // 3️⃣ Build partyId → name map
    const partyMap = {};
    (parties || []).forEach(p => {
        partyMap[p.id] = p.name;
    });

    // 4️⃣ Transform data
    const data = (rawMaterials || []).map(rm => ({
        name: rm.name,
        quantity: rm.quantity,
        unit: rm.unit,
        unit_price: rm.unit_price,
        supplier_name: partyMap[rm.supplier_id] || "-",
        last_updated: rm.last_updated
    }));

    // 5️⃣ Define headers
    const headers = [
        { key: "name", label: "Name" },
        { key: "quantity", label: "Quantity" },
        { key: "unit", label: "Unit" },
        { key: "unit_price", label: "Unit Price" },
        { key: "supplier_name", label: "Supplier" },
        { key: "last_updated", label: "Last Updated" }
    ];

    // 6️⃣ Generate & save Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "raw_materials.xlsx"
    });

    // 7️⃣ Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "raw_materials.xlsx"
    };
};