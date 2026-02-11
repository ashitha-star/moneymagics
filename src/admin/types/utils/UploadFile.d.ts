declare class UploadFile {
    sourceDirectoryFolderName: string;
    unableToUploadFileErr: string;
    fileArrayName: any[];
    htmlToPdfBuffer(html: any): Promise<any>;
    getS3ReadyClient_Change(g: any): Promise<unknown>;
    handler(g: any, __dirnameParam: any): Promise<{
        message: string;
        files: any[];
    }>;
    uploadFileToAWSS3(g: any, __dirnameParam: any, client: any): Promise<{
        message: string;
        files: any[];
    }>;
    uploadFile(c: any, bucketName: any, key: any, fileStream: any): Promise<any>;
    getContentType(filename: any): any;
}
declare let temp: UploadFile;
export = temp;