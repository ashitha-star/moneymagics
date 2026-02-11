const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g) {

    // Fetch sales invoices
    const invoices = await g.sys.db.getAll({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.proforma_invoice",
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
            name: p.name
        };
    });

    // Transform invoice data
    const data = (invoices || []).map(inv => ({
        invoice_number: inv.invoice_number,
        status: inv.status,
        customer_name: partyMap[inv.supplier_id]?.name || "-",
        due_amount: partyMap[inv.supplier_id]?.due_amount ?? 0,
        invoice_date: inv.invoice_date,
        total_amount: inv.total_amount
    }));

    // Define headers
    const headers = [
        { key: "invoice_number", label: "Proforma Invoice Number" },
        { key: "customer_name", label: "Customer" },
        { key: "invoice_date", label: "Invoice Date" },
        { key: "total_amount", label: "Net Amount" },
        { key: "status", label: "Status" },
    ];

    // Generate & save Excel
    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "Proforma_Invoices.xlsx"
    });

    // Api Maker download response
    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "Proforma_Invoices.xlsx"
    };
};