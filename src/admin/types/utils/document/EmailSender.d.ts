declare class EmailSender {
    transporter: any;
    from: string;
    sendMail({ to, cc, bcc, subject, html, attachments }: {
        to: any;
        cc?: any[];
        bcc?: any[];
        subject: any;
        html: any;
        attachments?: any[];
    }): Promise<{
        sent: boolean;
    }>;
    setConfig(smtpConfig: any): void;
    sendDocumentEmail(config: any): Promise<{
        sent: boolean;
    }>;
    getDocumentFilename(type: any, number: any): any;
    getEmailData(type: any, data: any): any;
}
declare const _default: EmailSender;
export default _default;