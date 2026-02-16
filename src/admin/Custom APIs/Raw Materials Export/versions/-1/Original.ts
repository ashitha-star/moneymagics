import * as T from "types";
import * as db from "db-interfaces";
const path = require("path");
const { generateAndSaveExcel } = require("utils/excel/invoiceExcelUtil");

module.exports = async function downloadInvoiceExcel(g: T.IAMGlobal) {
    const rawMaterials = await g.sys.db.query({
        instance: "test1",
        database: "moneymagics_db",
        collection: "public.raw_materials",
        deep: [{
            s_key: "supplier_id",
            select: "name"
        }]
    })

    const data = (rawMaterials || []).map((rm: any) => ({
        name: rm.name,
        quantity: rm.quantity,
        unit: rm.unit,
        unit_price: rm.unit_price,
        supplier_name: rm.supplier_id.name,
        last_updated: rm.last_updated
    }));

    const headers = [
        { key: "name", label: "Name" },
        { key: "quantity", label: "Quantity" },
        { key: "unit", label: "Unit" },
        { key: "unit_price", label: "Unit Price" },
        { key: "supplier_name", label: "Supplier" },
        { key: "last_updated", label: "Last Updated" }
    ];

    const savedFilePath = await generateAndSaveExcel({
        headers,
        data,
        folderPath: path.join(__dirname, "uploads"),
        fileName: "raw_materials.xlsx"
    });

    return {
        __am__downloadFilePath: savedFilePath,
        __am__downloadFolderFileName: "raw_materials.xlsx"
    };
};