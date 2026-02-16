// const path = require("path");
// const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

// module.exports = async function downloadInvoiceExcel(g) {

//     // Fetch sales invoices
//     const invoices = await g.sys.db.getAll({
//         instance: "test1",
//         database: "moneymagics_db",
//         collection: "public.purchase_invoice",
//     });

//     // Fetch parties (customers)
    // const parties = await g.sys.db.getAll({
    //     instance: "test1",
    //     database: "moneymagics_db",
    //     collection: "public.party",
    // });

    // // Build partyId → { name, due_amount } map
    // const partyMap = {};
    // (parties || []).forEach(p => {
    //     partyMap[p.id] = {
    //         name: p.name,
    //         due_amount: p.due_amount
    //     };
    // });

//     // Transform invoice data
//     const data = (invoices || []).map(inv => ({
//         invoice_number: inv.invoice_number,
//         status: inv.status,
//         customer_name: partyMap[inv.supplier_id]?.name || "-",
//         due_amount: partyMap[inv.supplier_id]?.due_amount ?? 0,
//         invoice_date: inv.invoice_date,
//         total_amount: inv.total_amount
//     }));

//     // Define headers
    // const headers = [
    //     { key: "invoice_number", label: "Invoice Number" },
    //     { key: "status", label: "Status" },
    //     { key: "customer_name", label: "Supplier" },
    //     { key: "invoice_date", label: "Invoice Date" },
    //     { key: "total_amount", label: "Net Amount" },
    //     { key: "due_amount", label: "Due Amount" },
    // ];

//     // Generate & save Excel
//     const savedFilePath = await generateAndSaveExcel({
//         headers,
//         data,
//         folderPath: path.join(__dirname, "uploads"),
//         fileName: "Purchase_Invoices.xlsx"
//     });

//     // Api Maker download response
//     return {
//         __am__downloadFilePath: savedFilePath,
//         __am__downloadFolderFileName: "Purchase_Invoices.xlsx"
//     };
// };

const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // Fetch invoices
    const invoices = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.purchase_invoice",
    });

    // Fetch invoice items
    const purchaseItems = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.purchase_item",
    });

    // Fetch parties
        const parties = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.party",
    });

    // Fetch items master
    const items = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.item",
    });

    // Create Maps for Fast Lookup
    const partyMap = {};
    (parties || []).forEach(p => {
        partyMap[p.id] = {
            name: p.name,
            due_amount: p.due_amount
        };
    });

    const itemMap = {};
    (items || []).forEach(i => {
        itemMap[i.id] = i.item_code || i.name;
    });

    // Group purchase items by invoice_id
    const itemGroupMap = {};
    (purchaseItems || []).forEach(si => {
        if (!itemGroupMap[si.invoice_id]) {
            itemGroupMap[si.invoice_id] = [];
        }
        itemGroupMap[si.invoice_id].push(si);
    });

    // Build Flattened Export Structure
    const data = [];

    (invoices || []).forEach(inv => {

        const invoiceItems = itemGroupMap[inv.id] || [];

        // If no items exist, still export invoice
        if (invoiceItems.length === 0) {
            data.push({
                invoice_number: inv.invoice_number,
                invoice_name: inv.invoice_name,
                status: inv.status,
                customer_name: partyMap[inv.supplier_id]?.name || "-",
                due_amount: partyMap[inv.supplier_id]?.due_amount ?? 0,
                invoice_date: inv.invoice_date,
                total_amount: inv.total_amount,
                notes: inv.notes || "",
                item_code: "",
                quantity: "",
                rate: "",
                tax_percent: "",
                amount: ""
            });
        }

        invoiceItems.forEach(si => {
            data.push({
                invoice_number: inv.invoice_number,
                invoice_name: inv.invoice_name,
                status: inv.status,
                customer_name: partyMap[inv.supplier_id]?.name || "-",
                due_amount: partyMap[inv.supplier_id]?.due_amount ?? 0,
                invoice_date: inv.invoice_date,
                total_amount: inv.total_amount,
                notes: inv.notes || "",
                item_code: itemMap[si.item_id] || "",
                quantity: si.quantity,
                rate: si.rate,
                tax_percent: si.tax_percent,
                amount: si.amount
            });
        });
    });

    // Define Headers (Flat Format)

    const headers = [
        { key: "invoice_number", label: "Invoice Number" },
        { key: "invoice_name", label: "Invoice Name" },
        { key: "customer_name", label: "Supplier" },
        { key: "due_amount", label: "Due Amount" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "status", label: "Status" },
        { key: "notes", label: "Notes" },
        
        { key: "item_code", label: "Item Code" },
        { key: "quantity", label: "Quantity" },
        { key: "tax_percent", label: "Tax Percent" },
        { key: "rate", label: "Rate" },
        { key: "amount", label: "Item Amount" },

        { key: "total_amount", label: "Invoice Amount" }

    
    ];

    // Generate Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "Purchase_Invoices.xlsx"
    });

    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "Purchase_Invoices.xlsx"
    };
};