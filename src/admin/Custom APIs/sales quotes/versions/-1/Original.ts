import * as uploadFile from 'utils/document/FileUploader';
import * as C from 'utils/Constants';
import { join } from "path";
import { randomUUID } from 'crypto';


async function sendSalesQuotes(g) {
    try {
        const body = g.req.body;

        if (body?.items && typeof body?.items === "string") {
            body.items = JSON.parse(body.items)
        }

        if (body?.email && typeof body?.email === "string") {
            body.email = JSON.parse(body.email)
        }
        
        const {
            quote_number,
            quote_name,
            customer_id,
            quote_date,
            expiry_date,
            status,
            total_amount,
            notes,
            to,
            cc,
            bcc,
            items = []
        } = g.req.body;

        const customer = await g.sys.db.getById({
            instance: C.instance,
            database: C.db,
            collection: C.col.party,
            id: customer_id
        });


        /* ---------- FILE UPLOAD ---------- */
        let attachmentKey = null;

        if (Array.isArray(body.files) && body.files.length) {

            g.req.body.bucketName = 'moneymagics-s3bucket';
            g.req.body.targetFolderWithPath =
                `sales_quotes/${body.quote_number}`;

            const uploadResp = await uploadFile.handler(g, __dirname);
            attachmentKey = uploadResp?.files?.[0];
        }


        /* ---------- SAVE SALES QUOTE ---------- */
        const referralToken = randomUUID();
        const quoteSave = await g.sys.db.saveSingleOrMultiple({
            instance: C.instance,
            database: C.db,
            collection: 'public.sales_quote',
            saveData: {
                quote_number,
                quote_name,
                customer_id,
                quote_date,
                expiry_date,
                status,
                total_amount,
                notes,
                attachment: attachmentKey,
                referral_id: referralToken
            }
        });

        const quoteId =
            quoteSave?.id ||
            quoteSave?.data?.id ||
            quoteSave?.[0]?.id;


        /* ---------- SAVE SALES ITEMS ---------- */
        for (const item of items) {
            await g.sys.db.saveSingleOrMultiple({
                instance: C.instance,
                database: C.db,
                collection: 'public.sales_item',
                saveData: {
                    quote_id: quoteId,
                    item_id: item.item_id,
                    quantity: item.quantity,
                    rate: item.rate,
                    tax_percent: item.tax_percent,
                    amount: item.amount
                }
            });
        }

        /* ---------- EMIT EVENT (MATCHES PURCHASE INVOICE) ---------- */
        const dbItems = await g.sys.db.query({
            instance: C.instance,
            database: C.db,
            collection: "sales_item",
            find: {
                quote_id: quoteId
            },
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

        const baseUrl = process.env.APP_BASE_URL || 'http://43.205.211.38:8080/';

        const acceptUrl = `${baseUrl}api/custom-api/admin/quoteaction?ref=${referralToken}&action=accept`;
        const rejectUrl = `${baseUrl}api/custom-api/admin/quoteaction?ref=${referralToken}&action=reject`;


        const messageHtml = `
        ${g.req.body.email?.message || '<p>Please find attached sales quote.</p>'}

        <div style="margin-top:20px;">
            <a href="${acceptUrl}"
            style="background:#28a745;color:#fff;
                    padding:10px 18px;
                    text-decoration:none;
                    border-radius:4px;
                    margin-right:10px;
                    display:inline-block;">
            ✅ Accept
            </a>

            <a href="${rejectUrl}"
            style="background:#dc3545;color:#fff;
                    padding:10px 18px;
                    text-decoration:none;
                    border-radius:4px;
                    display:inline-block;">
            ❌ Reject
            </a>
        </div>
        `;
        const attachments = [];

        if (Array.isArray(body.files) && body.files.length > 0) {
            attachments.push({
                filename: "QuoteData.xlsx",
                path: join(__dirname, "uploads", body.files[0]?.filename)
            });
        }


        const emaildata = {
            documentType: 'QUOTE',

            recipients: {
                to: g.req.body.email?.to || customer.email,
                cc: g.req.body.email?.cc || [],
                bcc: g.req.body.email?.bcc || []
            },

            message: messageHtml,

            document: {
                number: g.req.body.quote_number,
                date: g.req.body.quote_date,
                status: g.req.body.status,
                reference: g.req.body.quote_name
            },

            party: customer,

            items: dbItems,

            totals: [{
                label: 'Total Amount',
                value: g.req.body.total_amount,
                isGrand: true
            }],

            attachments
        };

        
        return {
            success: true,
            message: 'Sales Quote created successfully',
            data: {
                id: quoteId,
                name: "SEND_SALES_QUOTE_EMAIL",
                emaildata
            }
        };

    } catch (e) {
        console.log(e)
        return { success: false, error: e.message };
    }
}

module.exports = sendSalesQuotes;