// //     file uploading
// //     const resp = await uploadFile.handler(g, __dirname);
// //     const uploadedFilePath = resp.files[0];


import * as T from 'types';
import * as db from 'db-interfaces';
import * as uploadFile from 'utils/aws-s3-bucket/uploadFileUtil';
import { salesQuoteHTML } from 'utils/sales_quote';
import { htmlToPdfBuffer } from 'utils/pdf_generator';
import * as C from 'utils/Constants';

async function main(g: T.IAMGlobal) {
    try {
        // STEP 1: Upload attachments to S3 
        let uploadedFilePath: string | null = null;
        let fileBuffer: Buffer | null = null;
        
        // Keep the file in memory before uploading to S3
        if (g.req.body.files && Array.isArray(g.req.body.files) && g.req.body.files.length > 0) {
            // First, get the file data before uploading
            const fileData = g.req.body.files[0];
            
            // Store the file buffer for email attachment
            if (fileData.buffer || fileData.data) {
                fileBuffer = Buffer.from(fileData.buffer || fileData.data);
            } else if (fileData.path) {
                // If it's a file path, read it
                const fs = require('fs');
                fileBuffer = fs.readFileSync(fileData.path);
            }
            
            // Now upload to S3
            g.req.body.bucketName = 'moneymagics-s3bucket';

            const yearMonth = (() => {
                try {
                    return new Date(g.req.body.quote_date).toISOString().slice(0, 7);
                } catch {
                    return new Date().toISOString().slice(0, 7);
                }
            })();

            g.req.body.targetFolderWithPath =
                `quotes/${yearMonth}/${g.req.body.quote_number}`;

            const uploadResp = await uploadFile.handler(g, __dirname);
            
            if (Array.isArray(uploadResp.files) && uploadResp.files.length > 0) {
                uploadedFilePath = uploadResp.files[0]; 
            }
        }

        // STEP 2: Save quote to DB FIRST
        const quoteData = {
            quote_number: g.req.body.quote_number,
            quote_name: g.req.body.quote_name,
            customer_id: Number(g.req.body.customer_id),
            quote_date: new Date(g.req.body.quote_date).toISOString().split('T')[0],
            expiry_date: new Date(g.req.body.expiry_date).toISOString().split('T')[0],
            status: g.req.body.status,
            total_amount: g.req.body.total_amount,
            notes: g.req.body.notes || null,
            attachment: uploadedFilePath
        };

        const dbConfig = {
            instance: C.instance,
            database: C.db,
            collection: C.col.sales_quote,
            saveData: quoteData
        };

        const savedQuote: db.test1.moneymagics_db.IPublicSalesQuote =
            <any>await g.sys.db.saveSingleOrMultiple(dbConfig);

        g.logger.log('Quote saved to DB', { id: savedQuote.id });

        // STEP 3: Send Email (PDF + uploaded attachments)
        let emailStatus = {
            sent: false,
            recipient: null,
            error: null
        };

        if (g.req.body.to) {
            try {
                const smtp = await g.sys.system.getSecret('SMTP');
                const nodemailer = require('nodemailer');

                const transporter = nodemailer.createTransport({
                    host: smtp.SMTP_HOST,
                    port: smtp.SMTP_PORT || 587,
                    secure: smtp.SMTP_PORT === 465,
                    auth: {
                        user: smtp.SMTP_USER,
                        pass: smtp.SMTP_PASS
                    }
                });

                // Generate PDF
                const html = salesQuoteHTML({
                    company: { name: 'My Company', address: '', city: '' },
                    customer: { name: 'Customer', email: g.req.body.to },
                    quote: {
                        number: quoteData.quote_number,
                        name: quoteData.quote_name,
                        date: quoteData.quote_date,
                        expiry: quoteData.expiry_date
                    },
                    items: [],
                    subtotal: Number(quoteData.total_amount),
                    tax: 0,
                    total: Number(quoteData.total_amount)
                });

                const pdfBuffer = await htmlToPdfBuffer(html);

                // Prepare attachments
                const attachments = [
                    {
                        filename: `SalesQuote-${quoteData.quote_number}.pdf`,
                        content: pdfBuffer
                    }
                ];

                // Add uploaded file as attachment if we have the buffer
                if (fileBuffer) {
                    // Get original filename from the uploaded file
                    let originalFilename = 'attachment';
                    if (g.req.body.files && Array.isArray(g.req.body.files) && g.req.body.files[0]) {
                        originalFilename = g.req.body.files[0].originalname || 
                                          g.req.body.files[0].filename || 
                                          'attachment';
                    }
                    
                    attachments.push({
                        filename: originalFilename,
                        content: fileBuffer
                    });
                }

                const mailOptions = {
                    from: smtp.SMTP_FROM || smtp.SMTP_USER,
                    to: g.req.body.to,
                    cc: g.req.body.cc || undefined,
                    bcc: g.req.body.bcc || undefined,
                    subject: `Sales Quote - ${quoteData.quote_number}`,
                    html: '<p>Please find your sales quote attached.</p>',
                    attachments: attachments
                };

                // Add debug logging
                g.logger.log('Sending email with options:', {
                    to: mailOptions.to,
                    subject: mailOptions.subject,
                    attachmentCount: mailOptions.attachments.length
                });

                const info = await transporter.sendMail(mailOptions);
                
                emailStatus = {
                    sent: true,
                    recipient: g.req.body.to,
                    error: null
                };

                g.logger.log('Email sent successfully', {
                    messageId: info.messageId,
                    ...emailStatus
                });
            } catch (err) {
                g.logger.error('Email failed after DB save', {
                    error: err.message,
                    stack: err.stack
                });
                emailStatus.error = err.message;
            }
        }

        return {
            success: true,
            statusCode: 200,
            message: 'Quote created successfully',
            data: {
                id: savedQuote.id,
                ...quoteData,
                files_uploaded: !!uploadedFilePath,
                file_paths: uploadedFilePath,
                email_status: emailStatus
            }
        };

    } catch (error) {
        g.logger.error('Quote creation failed', error);

        throw [{
            message: 'Failed to create quote',
            systemMessage: error.message,
            code: T.EStatusCode.INTERNAL_SERVER_ERROR,
            stack: error.stack
        }];
    }
}

module.exports = main;