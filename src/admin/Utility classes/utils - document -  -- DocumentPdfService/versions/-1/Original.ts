import * as uploadFileUtil from 'utils/UploadFile';
import * as documentTemplate from 'utils/document/documentTemplate';

class DocumentPdfService {

    async generatePdf(documentType, data) {
        const {
            company,
            party,
            documentData,
            items = [],
            totals = []
        } = data;

        // 1. Build HTML
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

        // 2. Convert HTML → PDF
        const pdfBuffer = await uploadFileUtil.htmlToPdfBuffer(html);

        return {
            html,
            pdfBuffer,
            filename: this.getFilename(documentType, documentData.number)
        };
    }

    getFilename(type, number) {
        const map = {
            QUOTE: `Quote-${number}.pdf`,
            SALES_INVOICE: `SalesInvoice-${number}.pdf`,
            PURCHASE_INVOICE: `PurchaseInvoice-${number}.pdf`,
            PAYMENT: `PaymentReceipt-${number}.pdf`
        };

        return map[type] || `Document-${number}.pdf`;
    }
}

export default new DocumentPdfService();