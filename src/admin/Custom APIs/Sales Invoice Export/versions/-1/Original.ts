const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {


    let [invoices, salesItems, parties, items] = await Promise.all([
        g.sys.db.getAll({
            instance: "test1",
            database: "moneymagics_db",
            collection: "public.sales_invoice",
        }), g.sys.db.getAll({
            instance: "test1",
            database: "moneymagics_db",
            collection: "public.sales_item",
        }),
        g.sys.db.getAll({
            instance: "test1",
            database: "moneymagics_db",
            collection: "public.party",
        }),
        g.sys.db.getAll({
            instance: "test1",
            database: "moneymagics_db",
            collection: "public.item",
        })
    ])

    // Create Maps for Fast Lookup
    const partyMap = {};
    (parties || []).forEach(p => {
        partyMap[p.id] = p.name;
    });

    const itemMap = {};
    (items || []).forEach(i => {
        itemMap[i.id] = i.item_code || i.name;
    });

    // Group sales items by invoice_id
    const itemGroupMap = {};
    (salesItems || []).forEach(si => {
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
                customer_name: partyMap[inv.customer_id] || "-",
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
                customer_name: partyMap[inv.customer_id] || "-",
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
        { key: "status", label: "Status" },
        { key: "customer_name", label: "Customer" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "notes", label: "Notes" },
        { key: "item_code", label: "Item Code" },
        { key: "quantity", label: "Quantity" },
        { key: "tax_percent", label: "Tax Percent" },
        { key: "rate", label: "Rate" },
        { key: "total_amount", label: "Invoice Amount" }
    ];

    // Generate Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "Sales_Invoices.xlsx"
    });
    return;
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "Sales_Invoices.xlsx"
    };
};