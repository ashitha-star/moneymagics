// const path = require("path");
// const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

// module.exports = async function downloadInvoiceExcel(g) {

//     let category = g.req.body.category || null;
//     let categoryFilter;
//     let filePrefix;

//     // 🔹 Normalize category input
//     if (category) category = category.toLowerCase();

//     if (category === "sales") {
//         categoryFilter = "SALES";
//         filePrefix = "sales_items";
//     } else if (category === "purchase") {
//         categoryFilter = "PURCHASE";
//         filePrefix = "purchase_items";
//     } else {
//         // fallback → all items
//         categoryFilter = { "$in": ["SALES", "PURCHASE"] };
//         filePrefix = "all_items";
//     }

//     // Fetch items
//     const rows = await g.sys.db.query({
//         instance: "test1",
//         database: "moneymagics_db",
//         collection: "public.item",
//         find: {
//             category: categoryFilter
//         }
//     });

//     // Fetch tax codes (for name mapping)
//     const taxCodes = await g.sys.db.getAll({
//         instance: "test1",
//         database: "moneymagics_db",
//         collection: "public.tax_code"
//     });

//     // Build taxId → taxName map
//     const taxMap = {};
//     (taxCodes || []).forEach(t => {
//         taxMap[t.id] = t.name;
//     });

//     // Transform rows (replace tax id with name)
//     const data = (rows || []).map(item => ({
//         ...item,
//         tax: taxMap[item.tax] || "-"
//     }));

//     // Define headers
//     const headers = [
//         { key: "name", label: "Name" },
//         { key: "unit", label: "Unit" },
//         { key: "tax", label: "Tax" },
//         { key: "rate", label: "Rate" }
//     ];

//     const fileName = `${filePrefix}.xlsx`;

//     // 5️⃣ Generate & save Excel
//     const savedFilePath = await generateAndSaveExcel({
//         headers,
//         data,
//         folderPath: path.join(__dirname, "uploads"),
//         fileName
//     });

//     // 6️⃣ Api Maker download response
//     return {
//         __am__downloadFilePath: savedFilePath,
//         __am__downloadFolderFileName: fileName
//     };
// };

const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    let category = g.req.body.category || null;
    let categoryFilter;
    let filePrefix;
    let headers = [];

    // 🔹 Normalize category input
    if (category) category = category.toLowerCase();

    if (category === "sales") {
        categoryFilter = "SALES";
        filePrefix = "sales_items";
        headers = [
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "tax", label: "Tax" },
            { key: "rate", label: "Rate" }
        ];
    } else if (category === "purchase") {
        categoryFilter = "PURCHASE";
        filePrefix = "purchase_items";
        headers = [
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "tax", label: "Tax" },
            { key: "moq", label: "MOQ" },
            { key: "rate", label: "Rate" }
        ];
    } else {
        // fallback → all items
        categoryFilter = { "$in": ["SALES", "PURCHASE"] };
        filePrefix = "all_items";
        headers = [
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "tax", label: "Tax" },
            { key: "moq", label: "MOQ" },
            { key: "rate", label: "Rate" }
        ];
    }

    // Fetch items
    const rows = await g.sys.db.query({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.item",
        find: { category: categoryFilter }
    });

    // Fetch tax codes
    const taxCodes = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.tax_code"
    });

    // Build tax map
    const taxMap = {};
    (taxCodes || []).forEach(t => {
        taxMap[t.id] = t.name;
    });

    // Transform rows
    const data = (rows || []).map(item => ({
        ...item,
        tax: taxMap[item.tax] || "-"
    }));

    const fileName = `${filePrefix}.xlsx`;

    // Generate Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName
    });

    // Api Maker response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: fileName
    };
};