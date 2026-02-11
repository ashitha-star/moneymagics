const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {
    
    let role = g.req.body.role || null;
    let roleFilter = [];

    // 🔹 Normalize role input
    if (role === "both") {
        roleFilter = ["BOTH"];
    } else if (role === "customer") {
        roleFilter = ["CUSTOMER", "BOTH"];
    } else if (role === "supplier") {
        roleFilter = ["SUPPLIER", "BOTH"];
    } else {
        roleFilter = ["CUSTOMER", "SUPPLIER", "BOTH"];
        role ="party"
    }

    // 1️⃣ Fetch DB data
    const rows = await g.sys.db.query({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.party",
        find: {
            role: {
                "$in": roleFilter
            }
        }
    });


    // 2️⃣ Define headers
    const headers = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "due_amount", label: "due_amount" }
    ];
    const fileName = `${role}.xlsx`;

    // 3️⃣ Generate & save file
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data: rows || [],
        folderPath: path.join(__dirname,'uploads'),
        fileName: fileName
    });

    // 4️⃣ Return Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: fileName
    };
};