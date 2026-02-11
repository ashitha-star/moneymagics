const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // Fetch sales invoices
    const invoices = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.sales_invoice",
    });

    // Fetch parties (customers)
    const parties = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.party",
    });

    // Build partyId → { name, due_amount } map
    const partyMap = {};
    (parties || []).forEach(p => {
        partyMap[p.id] = {
            name: p.name,
            due_amount: p.due_amount
        };
    });

    // Transform invoice data
    const data = (invoices || []).map(inv => ({
        invoice_number: inv.invoice_number,
        status: inv.status,
        customer_name: partyMap[inv.customer_id]?.name || "-",
        due_amount: partyMap[inv.customer_id]?.due_amount ?? 0,
        invoice_date: inv.invoice_date,
        total_amount: inv.total_amount
    }));

    // Define headers
    const headers = [
        { key: "invoice_number", label: "Invoice Number" },
        { key: "status", label: "Status" },
        { key: "customer_name", label: "Customer" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "total_amount", label: "Net Amount" },
        { key: "due_amount", label: "Due Amount" },
    ];

    // Generate & save Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "Sales_Invoices.xlsx"
    });

    // Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "Sales_Invoices.xlsx"
    };
};