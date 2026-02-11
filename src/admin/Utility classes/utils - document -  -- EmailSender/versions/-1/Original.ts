import * as uploadFileUtil from 'utils/UploadFile';
import * as documentTemplate from 'utils/document/documentTemplate';

class EmailSender{
    transporter: any;
    from: string;

    async sendMail({ to, cc = [], bcc = [], subject, html, attachments = [] }) {
        console.log('[EmailSender] sendMail called');
        console.log('[EmailSender] To:', to);
        console.log('[EmailSender] Subject:', subject);
        console.log('[EmailSender] Attachments count:', attachments.length);

        if (!this.transporter) {
            console.error('[EmailSender] ❌ Transporter not configured');
            throw new Error('EmailSender not configured');
        }

        try {
            const result = await this.transporter.sendMail({
                from: this.from,
                to,
                cc,
                bcc,
                subject,
                html,
                attachments
            });

            console.log('[EmailSender] ✅ Email sent successfully');
            console.log('[EmailSender] MessageId:', result.messageId);

            return { sent: true };
        } catch (err) {
            console.error('[EmailSender] ❌ Error sending email');
            console.error(err);
            throw err;
        }
    }

    setConfig(smtpConfig) {

        const nodemailer = require('nodemailer');

        this.transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.port === 465,

            auth: {
                user: smtpConfig.user,
                pass: smtpConfig.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        this.from = smtpConfig.from;
        console.log('[EmailSender] ✅ SMTP configured');
    }

    async sendDocumentEmail(config) {
        console.log('[EmailSender] sendDocumentEmail called');
        console.log('[EmailSender] DocumentType:', config.documentType);

        const {
            documentType,
            to,
            company,
            party,
            documentData,
            items = [],
            totals = [],
            attachments = []
        } = config;

        try {
            // 1. Build HTML
            console.log('[EmailSender] Building HTML template');
            const html = documentTemplate.buildDocument(documentType, {
                company,
                party,
                document_number: documentData.number,
                document_date: documentData.date,
                status: documentData.status,
                reference: documentData.reference,
                items,
                totals
            });

            // 2. Generate PDF
            console.log('[EmailSender] Generating PDF');
            const pdfBuffer = await uploadFileUtil.htmlToPdfBuffer(html);
            console.log('[EmailSender] PDF generated, size:', pdfBuffer.length);

            // 3. Attach PDF
            const finalAttachments = [
                ...attachments,
                {
                    filename: this.getDocumentFilename(documentType, documentData.number),
                    content: pdfBuffer
                }
            ];

            console.log('[EmailSender] Total attachments:', finalAttachments.length);

            // 4. Send mail
            const mailData = this.getEmailData(documentType, documentData);
            console.log('[EmailSender] Sending email with subject:', mailData.subject);

            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: mailData.subject,
                html,
                attachments: finalAttachments
            });

            console.log('[EmailSender] ✅ Document email sent');

            return { sent: true };
        } catch (err) {
            console.error('[EmailSender] ❌ Failed to send document email');
            console.error(err);
            throw err;
        }
    }

    getDocumentFilename(type, number) {
        console.log('[EmailSender] getDocumentFilename:', type, number);

        const map = {
            QUOTE: `Quote-${number}.pdf`,
            SALES_INVOICE: `SalesInvoice-${number}.pdf`,
            PURCHASE_INVOICE: `PurchaseInvoice-${number}.pdf`,
            PAYMENT: `PaymentReceipt-${number}.pdf`
        };

        return map[type] || `Document-${number}.pdf`;
    }

    getEmailData(type, data) {
        console.log('[EmailSender] getEmailData:', type, data);

        const map = {
            QUOTE: { subject: `Quote #${data.number}` },
            SALES_INVOICE: { subject: `Invoice #${data.number}` },  // Changed from Invoice to Sales Invoice if needed
            PURCHASE_INVOICE: { subject: `Purchase Invoice #${data.number}` },
            PAYMENT: { subject: `Payment Receipt #${data.number}` }
        };

        return map[type] || { subject: `Document #${data.number}` };
    }
}

// let temp = new EmailSender();
// export = temp;
export default new EmailSender();