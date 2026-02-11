declare class DocumentPdfService {
    generatePdf(documentType: any, data: any): Promise<{
        html: any;
        pdfBuffer: any;
        filename: any;
    }>;
    getFilename(type: any, number: any): any;
}
declare const _default: DocumentPdfService;
export default _default;