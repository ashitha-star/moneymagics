const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {
    // 1️⃣ Fetch DB data
    const rows = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.sales_quote",
    });


    // 2️⃣ Define headers
    const headers = [
        { key: "quote_number", label: "Quote Number" },
        { key: "quote_name", label: "Quote Name" },
        { key: "customer_id", label: "Customer ID" },
        { key: "quote_date", label: "Quote Date" },
        { key: "expiry_date", label: "Expiry Date" },
        { key: "status", label: "Status" },
        { key: "total_amount", label: "Total Amount" },
        { key: "notes", label: "Notes" },
        { key: "attachment", label: "Attachment" }
    ];

    // 3️⃣ Generate & save file
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data: rows || [],
        folderPath: path.join(__dirname,'uploads'),
        fileName: "Sales_Quotes.xlsx"
    });

    // 4️⃣ Return Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "Sales_Quotes.xlsx"
    };
};