import * as T from 'types';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import * as C from 'utils/Constants';

function getCollection(entity: string) {

    const map: any = {
        customer: 'party',
        supplier: 'party',
        party: 'party',
        items: 'item',
        sales_invoice: 'sales_invoice'
    };

    if (!map[entity]) throw new Error(`Invalid entity: ${entity}`);
    return map[entity];
}

function mapRows(headers: string[], rows: any[][], mapping: any) {

    const headerIndex: any = {};
    headers.forEach((h, i) => headerIndex[h.trim()] = i);

    const mappedRows = rows.map((row, i) => {
        const obj: any = {};

        for (const dbField in mapping) {
            const header = mapping[dbField];
            const index = headerIndex[header];

            if (index !== undefined) {
                obj[dbField] = row[index];
            }
        }
        if (i < 3) {
            console.log(`[IMPORT] Sample mapped row ${i + 1}:`, obj);
        }

        return obj;
    });

    return mappedRows;
}


async function resolveRelations(g: T.IAMGlobal, records: any[]) {

    // 🔹 Fetch tax codes
    const taxList = await g.sys.db.getAll({
        instance: C.instance,
        database: C.db,
        collection: 'tax_code'
    });

    const taxRows = Array.isArray(taxList)
        ? taxList
        : taxList?.data || [];

    const taxMap: any = {};
    taxRows.forEach((t: any) => {
        if (t?.name) {
            taxMap[t.name.trim().toUpperCase()] = t.id;
        }
    });

    // 🔹 Fetch accounts
    const accountList = await g.sys.db.getAll({
        instance: C.instance,
        database: C.db,
        collection: 'account'
    });

    const accountRows = Array.isArray(accountList)
        ? accountList
        : accountList?.data || [];

    const accountMap: any = {};
    accountRows.forEach((a: any) => {
        if (a?.name) {
            accountMap[a.name.trim().toUpperCase()] = a.id;
        }
    });

    // 🔹 Replace relational values
    records.forEach(record => {

        // TAX
        if (record.tax) {
            const key = record.tax.toString().trim().toUpperCase();
            if (taxMap[key]) {
                record.tax = taxMap[key];
            } else {
                throw new Error(`Tax '${record.tax}' not found in tax_code table`);
            }
        }

        // SALES ACCOUNT
        if (record.sales_account_id) {
            const key = record.sales_account_id.toString().trim().toUpperCase();
            if (accountMap[key]) {
                record.sales_account_id = accountMap[key];
            } else {
                throw new Error(`Account '${record.sales_account_id}' not found in account table`);
            }
        }

        // PURCHASE ACCOUNT
        if (record.purchase_account_id) {
            const key = record.purchase_account_id.toString().trim().toUpperCase();
            if (accountMap[key]) {
                record.purchase_account_id = accountMap[key];
            } else {
                throw new Error(`Account '${record.purchase_account_id}' not found in account table`);
            }
        }

        // DEFAULT ACCOUNT
        if (record.default_account) {
            const key = record.default_account.toString().trim().toUpperCase();
            if (accountMap[key]) {
                record.default_account = accountMap[key];
            } else {
                throw new Error(`Account '${record.default_account}' not found in account table`);
            }
        }


    });

    return records;
}


async function importSalesInvoice(g: T.IAMGlobal, records: any[]) {

    // FETCH PARTIES
    const parties = await g.sys.db.getAll({
        instance: C.instance,
        database: C.db,
        collection: 'party'
    });

    const partyRows = Array.isArray(parties)
        ? parties
        : parties?.data || [];

    const partyNameMap: any = {};
    const partyIdSet = new Set<number>();

    partyRows.forEach((p: any) => {
        if (p?.name) {
            partyNameMap[p.name.trim().toUpperCase()] = p.id;
        }
        partyIdSet.add(Number(p.id));
    });

    // FETCH ITEMS (WITH RATE + TAX)
    const items = await g.sys.db.getAll({
        instance: C.instance,
        database: C.db,
        collection: 'item'
    });

    const itemMap: any = {};
    (items || []).forEach((i: any) => {
        const key = (i.item_code || i.name).trim().toUpperCase();

        itemMap[key] = {
            id: i.id,
            rate: Number(i.rate || 0),
            tax_percent: Number(i.tax_percent || 0)
        };
    });

    // GROUP ROWS BY INVOICE
    const grouped: any = {};

    records.forEach(r => {
        if (!grouped[r.invoice_number]) {
            grouped[r.invoice_number] = [];
        }
        grouped[r.invoice_number].push(r);
    });

    let insertedInvoices = 0;
    let skippedInvoices = 0;

    // PROCESS EACH INVOICE
    for (const invoiceNumber in grouped) {

        const rows = grouped[invoiceNumber];
        const firstRow = rows[0];

        // CUSTOMER VALIDATION

        let customerId: number | undefined;

        //customer_id provided
        if (firstRow.customer_id !== undefined && firstRow.customer_id !== null && firstRow.customer_id !== '') {

            const id = Number(firstRow.customer_id);

            if (!partyIdSet.has(id)) {
                throw new Error(`Customer id '${firstRow.customer_id}' not found`);
            }

            customerId = id;
        }

        // customer_name provided
        else if (firstRow.customer_name) {
            const key = firstRow.customer_name.toString().trim().toUpperCase();
            if (!partyNameMap[key]) {
                throw new Error(`Customer '${firstRow.customer_name}' not found`);
            }
            customerId = partyNameMap[key];
        }

        // missing customer
        else {
            throw new Error(`Customer is required (customer_id or customer_name)`);
        }


        // SKIP IF INVOICE EXISTS
        const existingResult = await g.sys.db.getAll({
            instance: C.instance,
            database: C.db,
            collection: "sales_invoice",
            queryParams: {
                find: {
                    invoice_number: invoiceNumber
                },
                limit: 1
            }
        }, true);


        const existingRows =
            Array.isArray(existingResult)
                ? existingResult
                : existingResult?.data || [];

        if (existingRows.length > 0) {
            skippedInvoices++;
            continue;
        }
        console.log("Checking invoice:", invoiceNumber);
        console.log("Existing rows:", existingRows);


        // CREATE INVOICE HEADER
        const invoiceData = {
            invoice_number: invoiceNumber,
            invoice_name: firstRow.invoice_name,
            status: firstRow.status,
            customer_id: customerId,
            invoice_date: firstRow.invoice_date,
            total_amount: String(firstRow.total_amount || 0),
            notes: firstRow.notes
        };

        const savedInvoice = await g.sys.db.saveSingleOrMultiple({
            instance: C.instance,
            database: C.db,
            collection: 'sales_invoice',
            saveData: invoiceData
        });

        const invoiceId = savedInvoice?.id || savedInvoice?.data?.id;

        // CREATE SALES ITEMS
        const salesItems = rows.map(r => {

            const itemKey = r.item_code?.toString().trim().toUpperCase();

            if (!itemMap[itemKey]) {
                throw new Error(`Item '${r.item_code}' not found`);
            }

            const item = itemMap[itemKey];

            // USE EXCEL VALUE OR FALLBACK TO ITEM MASTER
            const rate = Number(r.rate ?? item.rate);
            const tax_percent = Number(r.tax_percent ?? item.tax_percent);
            const quantity = Number(r.quantity || 0);

            // AUTO CALCULATE AMOUNT
            const amount = rate * quantity;

            return {
                invoice_id: invoiceId,
                item_id: item.id,
                quantity,
                rate,
                tax_percent,
                amount
            };
        });

        await g.sys.db.saveSingleOrMultiple({
            instance: C.instance,
            database: C.db,
            collection: 'sales_item',
            saveData: salesItems
        });

        insertedInvoices++;
    }

    return {
        insertedInvoices,
        skippedInvoices
    };
}



async function main(g: T.IAMGlobal) {

    try {
        const entity = g.req.body?.entity?.toLowerCase();
        const rawMapping = g.req.body?.mapping;
        const file = g.req.body?.files?.[0];

        if (!entity || !rawMapping || !file) {
            return { success: false, message: 'entity, mapping and file are required' };
        }

        const mapping =
            typeof rawMapping === 'string'
                ? JSON.parse(rawMapping)
                : rawMapping;

        const collection = getCollection(entity);

        const filePath = path.join(
            '/usr/src/app/uploads',
            file.filename
        );

        const ext = path.extname(file.originalname).toLowerCase();

        let headers: string[] = [];
        let rows: any[][] = [];

        if (ext === '.xlsx' || ext === '.xls') {

            const wb = XLSX.readFile(filePath);
            const sheet = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            headers = data[0] as string[];
            rows = data.slice(1);
        } else if (ext === '.csv') {

            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n').filter(Boolean);
            const parsed = lines.map(l => l.split(','));

            headers = parsed[0];
            rows = parsed.slice(1);
        } else {
            throw new Error(`Unsupported file type: ${ext}`);
        }

        if (!headers.length || !rows.length) {
            return { success: false, message: 'No data found in file' };
        }

        let records = mapRows(headers, rows, mapping);

        records = records.filter(record =>
            record &&
            Object.values(record).some(value =>
                value !== undefined &&
                value !== null &&
                value !== ''
            )
        );

        // Inject role for party entities
        if (entity === 'customer' || entity === 'supplier') {
            records = records.map(record => ({
                ...record,
                role: entity.toUpperCase()  
            }));
        }


        if (entity === 'items' || entity === 'customer' || entity === 'supplier') {
            records = await resolveRelations(g, records);
        }

        let dbResult;

        if (entity === 'sales_invoice') {
            dbResult = await importSalesInvoice(g, records);
        } else {
            dbResult = await g.sys.db.saveSingleOrMultiple({
                instance: C.instance,
                database: C.db,
                collection,
                saveData: records
            });
        }

        return {
            success: true,
            entity,
            collection,
            inserted: records.length,
            dbResult
        };

    } catch (e: any) {
        if (Array.isArray(e)) {
            return {
                success: false,
                error: e[0]?.message || 'Database error'
            };
        }

        return {
            success: false,
            error: e?.message || 'Unknown import error'
        };
    }
}

module.exports = main;