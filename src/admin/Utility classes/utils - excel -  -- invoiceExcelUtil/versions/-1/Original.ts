const XLSX = require("xlsx");
const path = require("path");

async function generateAndSaveExcel({ headers, data, folderPath, fileName }) {

    // join file path
    const filePath = path.join(folderPath, fileName);

    // Prepare worksheet data
    const worksheetData = [];

    // Header row
    worksheetData.push(headers.map(h => h.label));

    // Data rows
    data.forEach(row => {
        worksheetData.push(
            headers.map(h => row[h.key] ?? "")
        );
    });

    // Create workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    // Write file to disk
    XLSX.writeFile(workbook, filePath);

    return fileName;
}

module.exports = { generateAndSaveExcel };