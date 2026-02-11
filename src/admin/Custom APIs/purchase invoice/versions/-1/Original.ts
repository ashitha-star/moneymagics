import * as uploadFile from 'utils/document/FileUploader';
import { join } from "path";
import * as C from 'utils/Constants';
import * as fs from "fs";

async function sendPurchaseInvoice(g) {
    try {
        const body = g.req.body;

        if (body?.items && typeof body?.items === "string") {
            body.items = JSON.parse(body.items)
        }

        if (body?.email && typeof body?.email === "string") {
            body.email = JSON.parse(body.email)
        }

        /* Supplier */
        const supplier = await g.sys.db.getById({
            instance: C.instance,
            database: C.db,
            collection: C.col.party,
            id: body.supplier_id
        });

        /* Upload attachment */
        let attachmentKey = null;
        console.log(g.req.body)

        if (Array.isArray(body.files) && body.files.length) {

            g.req.body.bucketName = 'moneymagics-s3bucket';
            g.req.body.targetFolderWithPath =
                `purchase-invoices/${body.invoice_number}`;

            const uploadResp = await uploadFile.handler(g, __dirname);
            attachmentKey = uploadResp?.files?.[0];
        }

        /* Save Invoice */
        const invoice = await g.sys.db.saveSingleOrMultiple({
            instance: C.instance,
            database: C.db,
            collection: "purchase_invoice",
            saveData: {
                invoice_number: body.invoice_number,
                invoice_name: body.invoice_name,
                supplier_id: body.supplier_id,
                invoice_date: body.invoice_date,
                total_amount: body.total_amount,
                attachment: attachmentKey,
                status: body.status,
                notes: body.notes
            }
        });

        const invoiceId = invoice.id;




        /* Save Items */
        for (const item of body.items || []) {
            await g.sys.db.saveSingleOrMultiple({
                instance: C.instance,
                database: C.db,
                collection: "purchase_item",
                saveData: {
                    invoice_id: invoiceId,
                    item_id: item.item_id,
                    quantity: item.quantity,
                    rate: item.rate,
                    tax_percent: item.tax_percent || 0,
                    amount: item.amount
                }
            });
        }

        /* Fetch DB truth items */
        const dbItems = await g.sys.db.query({
            instance: C.instance,
            database: C.db,
            collection: "purchase_item",

            find: {
                invoice_id: invoiceId
            },

            select: "id,invoice_id,item_id,quantity,rate,tax_percent,amount",

            deep: [
                {
                    s_key: "item_id",
                    t_instance: C.instance,
                    t_db: C.db,
                    t_col: "item",
                    t_key: "id",
                    isMultiple: false,
                    select: "name,item_type"
                }
            ]
        }, true);



        /* Build emaildata */
        const emaildata = {
            documentType: 'PURCHASE_INVOICE',

            recipients: {
                to: body.email?.to || supplier.email,
                cc: body.email?.cc || [],
                bcc: body.email?.bcc || []
            },

            message: body.email?.message,

            document: {
                number: body.invoice_number,
                date: body.invoice_date,
                status: body.status,
                reference: body.invoice_name
            },

            party: supplier,

            items: dbItems,

            totals: [{
                label: 'Total Amount',
                value: body.total_amount,
                isGrand: true
            }],

            attachments: [
                {
                    filename: "invoiceData.xlsx",
                    path: join(__dirname, "uploads", body?.files[0]?.filename)
                }
            ]
        };

        console.log("avail files: ",fs.readdirSync(join(__dirname, "uploads")))

        return {
            success: true,
            message: 'Purchase invoice created successfully',
            data: {
                id: invoiceId,
                name: "SEND_PURCHASE_INVOICE_EMAIL",
                emaildata
            }
        };

    } catch (e) {
        console.log(e)
        return { success: false, error: e.message };
    }
}
module.exports = sendPurchaseInvoice;