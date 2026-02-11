import * as uploadFile from 'utils/document/FileUploader';
import * as C from 'utils/Constants';
import { join } from "path";

async function sendSalesInvoice(g) {
    try {
        const body = g.req.body;

        if (body?.items && typeof body?.items === "string") {
            body.items = JSON.parse(body.items)
        }

        if (body?.email && typeof body?.email === "string") {
            body.email = JSON.parse(body.email)
        }
        const {
            invoice_number,
            invoice_name,
            customer_id,
            invoice_date,
            status,
            quote_id,
            total_amount,
            notes,
            items = []
        } = g.req.body;

        const customer = await g.sys.db.getById({
            instance: C.instance,
            database: C.db,
            collection: C.col.party,
            id: customer_id
        });

        // let attachmentKey = null;
        // let extraAttachments: any[] = [];

        // /* ---------- FILE UPLOAD ---------- */
        // if (Array.isArray(g.req.files) && g.req.files.length > 0) {
        //     const fileData = g.req.files[0];

        //     g.req.body.bucketName = 'moneymagics-s3bucket';
        //     g.req.body.targetFolderWithPath =
        //         `sales-invoices/${invoice_number}`;

        //     const uploadResp = await uploadFile.handler(g, __dirname);
        //     attachmentKey = uploadResp?.files?.[0] || null;

        //     if (fileData.buffer || fileData.data) {
        //         extraAttachments.push({
        //             filename: fileData.originalname || 'attachment',
        //             content: Buffer.from(fileData.buffer || fileData.data)
        //         });
        //     }
        // }


        /* ---------- FILE UPLOAD ---------- */
        let attachmentKey = null;
        console.log(g.req.body)

        if (Array.isArray(body.files) && body.files.length) {

            g.req.body.bucketName = 'moneymagics-s3bucket';
            g.req.body.targetFolderWithPath =
                `sales_quotes/${body.invoice_number}`;

            const uploadResp = await uploadFile.handler(g, __dirname);
            attachmentKey = uploadResp?.files?.[0];
        }

        /* ---------- SAVE SALES INVOICE ---------- */
        const invSave = await g.sys.db.saveSingleOrMultiple({
            instance: C.instance,
            database: C.db,
            collection: 'public.sales_invoice',
            saveData: {
                invoice_number,
                invoice_name,
                customer_id,
                invoice_date,
                status,
                quote_id,
                total_amount,
                notes,
                attachment: attachmentKey
            }
        });

        const invoiceId =
            invSave?.id ||
            invSave?.data?.id ||
            invSave?.[0]?.id;

        /* ---------- SAVE SALES ITEMS ---------- */
        for (const item of items) {
            await g.sys.db.saveSingleOrMultiple({
                instance: C.instance,
                database: C.db,
                collection: 'public.sales_item',
                saveData: {
                    invoice_id: invoiceId,
                    item_id: item.item_id,
                    quantity: item.quantity,
                    rate: item.rate,
                    tax_percent: item.tax_percent,
                    amount: item.amount
                }
            });
        }

        /* ---------- FETCH ITEMS FOR EMAIL ---------- */
        const dbItems = await g.sys.db.query({
            instance: C.instance,
            database: C.db,
            collection: "sales_item",
            find: { invoice_id: invoiceId },
            deep: [{
                s_key: "item_id",
                t_instance: C.instance,
                t_db: C.db,
                t_col: "item",
                t_key: "id",
                isMultiple: false,
                select: "name,item_type"
            }]
        }, true);

        /* ---------- BUILD EVENT EMAIL DATA ---------- */
        const emaildata = {
            documentType: 'SALES_INVOICE',

            recipients: {
                to: g.req.body?.email?.to || customer.email,
                cc: g.req.body?.email?.cc || [],
                bcc: g.req.body?.email?.bcc || []
            },

            message:
                g.req.body?.email?.message,

            document: {
                number: invoice_number,
                date: invoice_date,
                status,
                reference: quote_id || '-'
            },

            party: customer,

            items: dbItems,

            totals: [{
                label: 'Total Amount',
                value: total_amount,
                isGrand: true
            }],

            attachments: [
                {
                    filename: "SalesinvoiceData.xlsx",
                    path: join(__dirname, "uploads", body?.files[0]?.filename)
                }
            ]
            //             attachments: extraAttachments   


        };

        


        return {
            success: true,
            message: 'Sales invoice created successfully',
            data: {
                id: invoiceId,
                name: "SEND_SALES_INVOICE_EMAIL",
                emaildata
            }
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error?.message || error
        };
    }
}

module.exports = sendSalesInvoice;