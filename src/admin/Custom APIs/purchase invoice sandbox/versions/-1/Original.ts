import * as T from 'types';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function main(g: T.IAMGlobal) {
    // Place your code here.
    try {
        const outDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        const browser = await chromium.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });
        const page = await browser.newPage();

        console.log('Navigating to https://playwright.dev ...');
        await page.goto('https://playwright.dev', { waitUntil: 'networkidle' });

        const filename = path.join(outDir, 'playwright-dev.pdf');
        console.log('Generating PDF to', filename);
        await page.pdf({ path: filename, format: 'A4' });

        await browser.close();
        console.log('PDF generated:', filename);

        return {
            __am__downloadFilePath: path.basename(filename),
            __am__downloadFolderFileName: path.basename(filename)
        }
    } catch (err) {
        console.error('Error generating PDF:', err);
    }
};
module.exports = main;

// import * as EmailSender from 'utils/document/EmailSender';
// import * as uploadFile from 'utils/document/FileUploader';
// import * as C from 'utils/Constants';


// async function sendPurchaseInvoice(g) {
//     // return "data"
//     try {
//         const aws = (await g.sys.system.getSecret('aws-s3-bucket'))['1.0.0'];
//         const smtp = await g.sys.system.getSecret('SMTP');

//         EmailSender.setConfig({
//             host: smtp.SMTP_HOST,
//             port: smtp.SMTP_PORT,
//             user: smtp.SMTP_USER,
//             pass: smtp.SMTP_PASS,
//             from: smtp.SMTP_FROM
//         });

//         // Get request data
//         const { invoice_number, invoice_name, supplier_id, invoice_date, total_amount, to, notes, status } = g.req.body;

//         let supplier = await g.sys.db.getById({
//             instance: C.instance, database: C.db, collection: C.col.party,
//             id: supplier_id
//         });

//         let fileBuffer: Buffer | null = null;
//         let attachmentPath = null;

//         if (g.req.body.files && Array.isArray(g.req.body.files) && g.req.body.files.length > 0) {
//             const fileData = g.req.body.files[0];

//             // Store the file buffer for email attachment
//             if (fileData.buffer || fileData.data) {
//                 fileBuffer = Buffer.from(fileData.buffer || fileData.data);
//             } else if (fileData.path) {
//                 // If it's a file path, read it
//                 const fs = require('fs');
//                 fileBuffer = fs.readFileSync(fileData.path);
//             }

//             // Upload attachment if exists
//             g.req.body.bucketName = 'moneymagics-s3bucket';
//             const yearMonth = new Date(invoice_date).toISOString().slice(0, 7);
//             g.req.body.targetFolderWithPath =
//                 `purchase-invoices/${yearMonth}/${invoice_number}`;
//             const uploadResp = await uploadFile.handler(g, __dirname);
//             if (Array.isArray(uploadResp.files) && uploadResp.files.length > 0) {
//                 attachmentPath = uploadResp.files[0];
//             }
//         }

//         // Send email with document
//         let emailAttachments: any[] = [];

//         if (fileBuffer) {
//             let originalFilename = 'attachment';

//             if (g.req.body.files?.[0]) {
//                 originalFilename =
//                     g.req.body.files[0].originalname ||
//                     g.req.body.files[0].filename ||
//                     'attachment';
//             }

//             emailAttachments.push({
//                 filename: originalFilename,
//                 content: fileBuffer
//             });
//         }

//         // const emailResponse: any = await EmailSender.sendDocumentEmail({
//         //     documentType: 'PURCHASE_INVOICE',
//         //     to,
//         //     company: {
//         //         name: "company_name",
//         //         address: "company_address",
//         //         city: "company_city"
//         //     },
//         //     party: {
//         //         name: supplier.name,
//         //         address: supplier.address,
//         //         email: supplier.email
//         //     },
//         //     documentData: {
//         //         number: invoice_number,
//         //         date: invoice_date,
//         //         amount: total_amount
//         //     },
//         //     totals: [
//         //         { label: 'Total Amount', value: total_amount, isGrand: true }
//         //     ],
//         //     attachments: emailAttachments
//         //     });


//         // Store to table
//         const saveResult = await g.sys.db.masterSave({
//             instance: "test1", database: "moneymagics_db", collection: "purchase_invoice",
//             saveData: {
//                 invoice_number,
//                 invoice_name: invoice_name,
//                 supplier_id,
//                 invoice_date,
//                 total_amount,
//                 attachment: attachmentPath || null,
//                 status,
//                 notes: notes
//             }
//         });

//         const InvId =
//             saveResult?.id ||
//             saveResult?.data?.id ||
//             saveResult?.[0]?.id ||
//             null;

//         const emaildata = ({
//             documentType: 'PURCHASE_INVOICE',
//             to, company: {
//                 name: "company_name", address: "company_address",
//                 city: "company_city"
//             }, party: {
//                 name: supplier.name,
//                 address: supplier.address, email: supplier.email
//             },
//             documentData: {
//                 number: invoice_number, date: invoice_date,
//                 amount: total_amount
//             }, totals: [{ label: 'Total Amount', value: total_amount, isGrand: true }], 
//             attachmentPath
//             // pdfBase64: pdfBuffer.toString('base64')
//         });

//         const resp = {
//             success: true,
//             message: 'Purchase invoice sent successfully',
//             data: {
//                 id: InvId,
//                 invoice_number,
//                 attachment_path: attachmentPath,
//                 emaildata
//             }
//         };
//         return resp

//     } catch (error) {
//         return {
//             success: false,
//             error: error?.message || error || 'Unknown error'
//         };
//     }

// }

// module.exports = sendPurchaseInvoice;