declare const DocumentTypes: {
    QUOTE: {
        title: string;
        numberLabel: string;
        partyLabel: string;
        footer: string;
    };
    SALES_INVOICE: {
        title: string;
        numberLabel: string;
        partyLabel: string;
        footer: string;
    };
    PURCHASE_INVOICE: {
        title: string;
        numberLabel: string;
        partyLabel: string;
        footer: string;
    };
    PAYMENT: {
        title: string;
        numberLabel: string;
        partyLabel: string;
        footer: string;
    };
};
declare function documentTemplate(data: any): string;
declare function buildDocument(type: any, payload: any): string;