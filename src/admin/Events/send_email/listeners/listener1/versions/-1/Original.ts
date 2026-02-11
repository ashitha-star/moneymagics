import EmailSender from 'utils/document/EmailSender';
import DocumentPdfService from 'utils/document/DocumentPdfService';
import * as path from 'path';

async function main(g) {

    console.log(
        "EVENT DATA >>>",
        JSON.stringify(g.req.eventData, null, 2)
    );

    const emaildata =
        g.req.eventData?.data?.data?.emaildata;
    console.log("emaildatazzzzzz", emaildata)

    if (!emaildata) {
        throw new Error("emaildata missing");
    }

    const smtp = await g.sys.system.getSecret('SMTP');
    console.log(smtp)

    EmailSender.setConfig({
        host: smtp.SMTP_HOST,
        port: smtp.SMTP_PORT,
        user: smtp.SMTP_USER,
        pass: smtp.SMTP_PASS,
        from: smtp.SMTP_FROM
    });

    /* Normalize items */
    const items = emaildata.items?.data || [];
    console.log(items)

    /* Generate PDF */
    const pdf = await DocumentPdfService.generatePdf(
        emaildata.documentType,
        {
            company: emaildata.company || {
                name: "BrandMagics Software Labs",
                address: "Kochi, Kerala"
            },
            party: emaildata.party,
            documentData: emaildata.document,
            items,
            totals: emaildata.totals
        }
    );

    let attachments = [{
        filename: pdf.filename,
        content: pdf.pdfBuffer
    }];
    console.log(pdf.filename)

    if (emaildata?.attachments?.length) {
        console.log("Got File in Event data...");
        attachments.push(...emaildata?.attachments)
    }

    console.log("total files: ", attachments)

    const subjectMap = {
        SALES_INVOICE: 'Sales Invoice',
        PURCHASE_INVOICE: 'Purchase Invoice',
        QUOTE: 'Sales Quote'
    };

    const docTypeLabel =
        subjectMap[emaildata.documentType] || 'Document';

    /* SEND EMAIL */
    await EmailSender.sendMail({
        to: emaildata.recipients.to,
        cc: emaildata.recipients.cc,
        bcc: emaildata.recipients.bcc,
        subject: `${docTypeLabel} #${emaildata.document.number}`,
        html: emaildata.message,
        attachments
    });

    return { success: true };
}

module.exports = main;