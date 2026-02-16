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
            { key: "rate", label: "Rate" },
            { key: "item_type", label: "Item_type" },
            { key: "item_code", label: "Item_code" },
            { key: "sales_account_id", label: "Sales Account" },
            { key: "purchase_account_id", label: "Purchase Account" }

        ];
    } else if (category === "purchase") {
        categoryFilter = "PURCHASE";
        filePrefix = "purchase_items";
        headers = [
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "tax", label: "Tax" },
            { key: "min_order_quantity", label: "Minimun order quantity" },
            { key: "rate", label: "Rate" },
            { key: "item_type", label: "Item_type" },
            { key: "item_code", label: "Item_code" },
            { key: "sales_account_id", label: "Sales Account" },
            { key: "purchase_account_id", label: "Purchase Account" }
        ];
    } else {
        // fallback → all items
        categoryFilter = { "$in": ["SALES", "PURCHASE"] };
        filePrefix = "all_items";
        headers = [
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "tax", label: "Tax" },
            { key: "min_order_quantity", label: "Minimun order quantity" },
            { key: "rate", label: "Rate" },
            { key: "category", label: "Category" },
            { key: "rate", label: "Rate" },
            { key: "item_type", label: "Item_type" },
            { key: "item_code", label: "Item_code" },
            { key: "sales_account_id", label: "Sales Account" },
            { key: "purchase_account_id", label: "Purchase Account" }
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

    // Fetch accounts
    const accounts = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.account"
    });


    // Build tax map
    const taxMap = {};
    (taxCodes || []).forEach(t => {
        taxMap[t.id] = t.name;
    });

    // Build account map
    const accountMap = {};
    (accounts || []).forEach(acc => {
        accountMap[acc.id] = acc.name;
    });


    // Transform rows
    const data = (rows || []).map(item => ({
        ...item,
        tax: taxMap[item.tax] || "-",
        sales_account_id: accountMap[item.sales_account_id] || "-",
        purchase_account_id: accountMap[item.purchase_account_id] || "-"
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