declare const playwright: any;
declare const S3: any, PutObjectCommand: any;
declare const path: any;
declare const fs: any;
declare function htmlToPdfBuffer(html: any): Promise<any>;
declare class UploadFile {
    sourceDirectoryFolderName: string;
    unableToUploadFileErr: string;
    fileArrayName: any[];
    getS3ReadyClient_Change(g: any): Promise<unknown>;
    clearUploadsFolder(g: any, __dirnameParam: any): Promise<void>;
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
declare const uploadFileInstance: UploadFile;