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

    // Fetch DB data
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

    // Define headers
    const headers = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "address", label: "Address" },
        { key: "default_account", label: "Account" },
        { key: "currency", label: "Currency" },
        { key: "gst_reg", label: "GST Registration" },
        { key: "gstin_no", label: "GSTIN No" },
        { key: "due_amount", label: "Due Amount" }
        
    ];
    const fileName = `${role}.xlsx`;

    // Generate & save file
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data: rows || [],
        folderPath: path.join(__dirname,'uploads'),
        fileName: fileName
    });

    // Return Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: fileName
    };
};