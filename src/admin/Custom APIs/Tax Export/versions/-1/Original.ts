const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {
    // 1️⃣ Fetch DB data
    const rows = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.tax_code",
    });


    // 2️⃣ Define headers
    const headers = [
        { key: "name", label: "Name" }
    ];

    // 3️⃣ Generate & save file
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data: rows || [],
        folderPath: path.join(__dirname,'uploads'),
        fileName: "tax_temp.xlsx"
    });

    // 4️⃣ Return Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "tax_temp.xlsx"
    };
};