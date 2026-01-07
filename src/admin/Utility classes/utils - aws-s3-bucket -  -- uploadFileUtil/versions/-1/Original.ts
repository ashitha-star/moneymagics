// import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as T from 'types';

// class uploadFile {
//     sourceDirectoryFolderName = 'uploads'; // do not change it.
//     unableToUploadFileErr = 'Unable to upload file';
//     fileArrayName: string[] = [];

//     async getS3ReadyClient_Change(g: T.IAMGlobal) {
//         return new Promise<any>(async (resolve, reject) => {
//             try {
//                 let fullSecretObj = await g.sys.system.getSecret('aws-s3-bucket');
//                 fullSecretObj = fullSecretObj["1.0.0"];
//                 const client = new S3({
//                     region: fullSecretObj.region,
//                     credentials: {
//                         accessKeyId: fullSecretObj.accessKeyId,
//                         secretAccessKey: fullSecretObj.secretAccessKey
//                     }
//                 });
//                 resolve(client);
//             } catch (e) {
//                 reject(e);
//             }
//         });
//     }

//     async handler(g: T.IAMGlobal, __dirnameParam: string) {
//         try {
//             // connect with S3 client
//             let c = await this.getS3ReadyClient_Change(g);

//             // upload files to s3 and get respone
//             let response = await this.uploadFileToAWSS3(g, __dirnameParam, c);
//             return response;
//         } catch (e) {
//             throw [<T.IResponseError>{
//                 message: this.unableToUploadFileErr,
//                 systemMessage: e.message,
//                 field: g.req.body.bucketName,
//                 code: T.EStatusCode.BAD_REQUEST,
//                 stack: e.stack,
//                 value: e,
//             }];
//         }
//     }

//     async uploadFileToAWSS3(g: T.IAMGlobal, __dirnameParam: string, client: S3) {

//         //user input
//         let bucketName = g.req.body.bucketName; // s3 bucket name
//         let uploadFilesArray = g.req.body.files;
//         let targetFolderWithPath = g.req.body.targetFolderWithPath; // s3 bucket folder name, where to upload

//         //upload turn by turn
//         for (let i = 0; i < uploadFilesArray.length; i++) {

//             //create key        
//             const fileName = uploadFilesArray[i].filename;
//             const originalfileName = uploadFilesArray[i].originalname;
//             let key = `${targetFolderWithPath}/${originalfileName}`;
//             this.fileArrayName.push(key)

//             //create read steam of selected file
//             const filePath = path.join(__dirnameParam, this.sourceDirectoryFolderName, fileName);
//             const fileStream = fs.createReadStream(filePath);

//             // below will upload file to S3 bucket.
//             await this.uploadFile(client, bucketName, key, fileStream);
//         }
//         return {
//             message: "File uploaded successfully",
//             files: this.fileArrayName
//         };
//     }

//     async uploadFile(c: S3, bucketName: string, key: string, fileStream: fs.ReadStream) {

//         //Upload file to a bucket
//         return await c.send(new PutObjectCommand({
//             Bucket: bucketName,
//             Key: key,
//             Body: fileStream
//         }));
//     }

// }

// let temp = new uploadFile();
// export = temp;



















// import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
// // const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// import * as path from 'path';
// import * as fs from 'fs';
// // import * as T from 'types';
// const T = require('types');

// class uploadFile {
//     sourceDirectoryFolderName = 'uploads';
//     unableToUploadFileErr = 'Unable to upload file';
//     fileArrayName: string[] = [];

//     async getS3ReadyClient_Change(g: T.IAMGlobal) {
//         return new Promise<any>(async (resolve, reject) => {
//             try {
//                 let fullSecretObj = await g.sys.system.getSecret('aws-s3-bucket');
//                 fullSecretObj = fullSecretObj["1.0.0"];
//                 const client = new S3({
//                     region: fullSecretObj.region,
//                     credentials: {
//                         accessKeyId: fullSecretObj.accessKeyId,
//                         secretAccessKey: fullSecretObj.secretAccessKey
//                     }
//                 });
//                 resolve(client);
//             } catch (e) {
//                 reject(e);
//             }
//         });
//     }

//     async clearUploadsFolder(g: T.IAMGlobal, __dirnameParam: string) {
//         try {
//             const uploadsPath = path.join(__dirnameParam, this.sourceDirectoryFolderName);
            
//             if (fs.existsSync(uploadsPath)) {
//                 const files = fs.readdirSync(uploadsPath);
//                 let deletedCount = 0;
                
//                 for (const file of files) {
//                     const filePath = path.join(uploadsPath, file);
//                     try {
//                         // Only delete files older than 1 hour to avoid conflicts
//                         const stats = fs.statSync(filePath);
//                         const now = new Date();
//                         const fileAge = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60); // hours
                        
//                         if (fileAge > 1) { // Delete files older than 1 hour
//                             fs.unlinkSync(filePath);
//                             deletedCount++;
//                             g.logger.log('Cleared old temp file:', file);
//                         }
//                     } catch (err) {
//                         g.logger.warn('Could not delete file:', file, err.message);
//                     }
//                 }
                
//                 if (deletedCount > 0) {
//                     g.logger.log(`Cleared ${deletedCount} old temp files`);
//                 }
//             }
//         } catch (error) {
//             g.logger.warn('Could not clear uploads folder:', error.message);
//         }
//     }

//     async handler(g: T.IAMGlobal, __dirnameParam: string) {
//         try {
//             // Clear only old temp files (not all)
//             await this.clearUploadsFolder(g, __dirnameParam);
            
//             // Connect with S3 client
//             let c = await this.getS3ReadyClient_Change(g);

//             // Upload files to S3 and get response
//             let response = await this.uploadFileToAWSS3(g, __dirnameParam, c);
//             return response;
//         } catch (e) {
//             throw [<T.IResponseError>{
//                 message: this.unableToUploadFileErr,
//                 systemMessage: e.message,
//                 field: g.req.body.bucketName,
//                 code: T.EStatusCode.BAD_REQUEST,
//                 stack: e.stack,
//                 value: e,
//             }];
//         }
//     }

//     async uploadFileToAWSS3(g: T.IAMGlobal, __dirnameParam: string, client: S3) {
//         this.fileArrayName = [];

//         let bucketName = g.req.body.bucketName;
//         let uploadFilesArray = g.req.body.files;
//         let targetFolderWithPath = g.req.body.targetFolderWithPath;

//         if (!bucketName) {
//             throw new Error('Bucket name is required');
//         }

//         if (!uploadFilesArray || !Array.isArray(uploadFilesArray) || uploadFilesArray.length === 0) {
//             return {
//                 message: "No files to upload",
//                 files: []
//             };
//         }

//         if (!targetFolderWithPath) {
//             // Default folder if not provided
//             targetFolderWithPath = `uploads/${new Date().toISOString().slice(0, 7)}`;
//             g.logger.warn('No target folder specified, using default:', targetFolderWithPath);
//         }

//         g.logger.log('Starting upload:', {
//             bucket: bucketName,
//             targetFolder: targetFolderWithPath,
//             fileCount: uploadFilesArray.length
//         });

//         for (let i = 0; i < uploadFilesArray.length; i++) {
//             const fileInfo = uploadFilesArray[i];
            
//             if (!fileInfo || !fileInfo.filename || !fileInfo.originalname) {
//                 g.logger.warn('Skipping invalid file entry:', fileInfo);
//                 continue;
//             }

//             const fileName = fileInfo.filename;
//             const originalfileName = fileInfo.originalname;
            
//             // Sanitize file name
//             const sanitizedFileName = originalfileName.replace(/[^a-zA-Z0-9._-]/g, '_');
//             let key = `${targetFolderWithPath}/${sanitizedFileName}`;
            
//             this.fileArrayName.push(key);

//             const filePath = path.join(__dirnameParam, this.sourceDirectoryFolderName, fileName);
            
//             if (!fs.existsSync(filePath)) {
//                 g.logger.error('File not found at path:', filePath);
//                 throw new Error(`File not found: ${originalfileName}`);
//             }

//             try {
//                 const fileStream = fs.createReadStream(filePath);
//                 await this.uploadFile(client, bucketName, key, fileStream);
//                 g.logger.log('Uploaded:', key);
                
//                 // Clean up temp file
//                 try {
//                     fs.unlinkSync(filePath);
//                     g.logger.log('Cleaned up temp file:', filePath);
//                 } catch (cleanupError) {
//                     g.logger.warn('Could not delete temp file:', cleanupError.message);
//                 }
                
//             } catch (uploadError) {
//                 g.logger.error('Failed to upload file:', originalfileName, uploadError.message);
//                 throw uploadError;
//             }
//         }
    
//         return {
//             message: "File uploaded successfully",
//             files: this.fileArrayName
//         };
//     }


//     async uploadFile(c: S3, bucketName: string, key: string, fileStream: fs.ReadStream) {
//         return await c.send(new PutObjectCommand({
//             Bucket: bucketName,
//             Key: key,
//             Body: fileStream,
//             ContentType: this.getContentType(key)
//         }));
//     }

//     // Helper to set content type based on file extension
//     getContentType(filename: string): string {
//         const ext = path.extname(filename).toLowerCase();
//         const contentTypes = {
//             '.pdf': 'application/pdf',
//             '.jpg': 'image/jpeg',
//             '.jpeg': 'image/jpeg',
//             '.png': 'image/png',
//             '.gif': 'image/gif',
//             '.txt': 'text/plain',
//             '.csv': 'text/csv',
//             '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//             '.xls': 'application/vnd.ms-excel',
//             '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//             '.doc': 'application/msword',
//             '.json': 'application/json'
//         };
//         return contentTypes[ext] || 'application/octet-stream';
//     }

// }

// let temp = new uploadFile();
// export = temp;

const playwright = require("playwright");
const { S3, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');

async function htmlToPdfBuffer(html) {
    const browser = await playwright.chromium.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true
    });

    await browser.close();
    return buffer;
}

class UploadFile {
    sourceDirectoryFolderName = 'uploads';
    unableToUploadFileErr = 'Unable to upload file';
    fileArrayName = [];

    async getS3ReadyClient_Change(g) {
        return new Promise(async (resolve, reject) => {
            try {
                let fullSecretObj = await g.sys.system.getSecret('aws-s3-bucket');
                fullSecretObj = fullSecretObj["1.0.0"];
                const client = new S3({
                    region: fullSecretObj.region,
                    credentials: {
                        accessKeyId: fullSecretObj.accessKeyId,
                        secretAccessKey: fullSecretObj.secretAccessKey
                    }
                });
                resolve(client);
            } catch (e) {
                reject(e);
            }
        });
    }

    async clearUploadsFolder(g, __dirnameParam) {
        try {
            const uploadsPath = path.join(__dirnameParam, this.sourceDirectoryFolderName);
            
            if (fs.existsSync(uploadsPath)) {
                const files = fs.readdirSync(uploadsPath);
                let deletedCount = 0;
                
                for (const file of files) {
                    const filePath = path.join(uploadsPath, file);
                    try {
                        const stats = fs.statSync(filePath);
                        const now = new Date();
                        const fileAge = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60);
                        
                        if (fileAge > 1) {
                            fs.unlinkSync(filePath);
                            deletedCount++;
                            g.logger.log('Cleared old temp file:', file);
                        }
                    } catch (err) {
                        g.logger.warn('Could not delete file:', file, err.message);
                    }
                }
                
                if (deletedCount > 0) {
                    g.logger.log(`Cleared ${deletedCount} old temp files`);
                }
            }
        } catch (error) {
            g.logger.warn('Could not clear uploads folder:', error.message);
        }
    }

    async handler(g, __dirnameParam) {
        try {
            await this.clearUploadsFolder(g, __dirnameParam);
            
            let c = await this.getS3ReadyClient_Change(g);

            let response = await this.uploadFileToAWSS3(g, __dirnameParam, c);
            return response;
        } catch (e) {
            throw [{
                message: this.unableToUploadFileErr,
                systemMessage: e.message,
                field: g.req.body.bucketName,
                code: 400, // Use numeric code instead of T.EStatusCode.BAD_REQUEST
                stack: e.stack,
                value: e,
            }];
        }
    }

    async uploadFileToAWSS3(g, __dirnameParam, client) {
        this.fileArrayName = [];

        let bucketName = g.req.body.bucketName;
        let uploadFilesArray = g.req.body.files;
        let targetFolderWithPath = g.req.body.targetFolderWithPath;

        if (!bucketName) {
            throw new Error('Bucket name is required');
        }

        if (!uploadFilesArray || !Array.isArray(uploadFilesArray) || uploadFilesArray.length === 0) {
            return {
                message: "No files to upload",
                files: []
            };
        }

        if (!targetFolderWithPath) {
            targetFolderWithPath = `uploads/${new Date().toISOString().slice(0, 7)}`;
            g.logger.warn('No target folder specified, using default:', targetFolderWithPath);
        }

        g.logger.log('Starting upload:', {
            bucket: bucketName,
            targetFolder: targetFolderWithPath,
            fileCount: uploadFilesArray.length
        });

        for (let i = 0; i < uploadFilesArray.length; i++) {
            const fileInfo = uploadFilesArray[i];
            
            if (!fileInfo || !fileInfo.filename || !fileInfo.originalname) {
                g.logger.warn('Skipping invalid file entry:', fileInfo);
                continue;
            }

            const fileName = fileInfo.filename;
            const originalfileName = fileInfo.originalname;
            
            const sanitizedFileName = originalfileName.replace(/[^a-zA-Z0-9._-]/g, '_');
            let key = `${targetFolderWithPath}/${sanitizedFileName}`;
            
            this.fileArrayName.push(key);

            const filePath = path.join(__dirnameParam, this.sourceDirectoryFolderName, fileName);
            
            if (!fs.existsSync(filePath)) {
                g.logger.error('File not found at path:', filePath);
                throw new Error(`File not found: ${originalfileName}`);
            }

            try {
                const fileStream = fs.createReadStream(filePath);
                await this.uploadFile(client, bucketName, key, fileStream);
                g.logger.log('Uploaded:', key);
                
                try {
                    fs.unlinkSync(filePath);
                    g.logger.log('Cleaned up temp file:', filePath);
                } catch (cleanupError) {
                    g.logger.warn('Could not delete temp file:', cleanupError.message);
                }
                
            } catch (uploadError) {
                g.logger.error('Failed to upload file:', originalfileName, uploadError.message);
                throw uploadError;
            }
        }
    
        return {
            message: "File uploaded successfully",
            files: this.fileArrayName
        };
    }

    async uploadFile(c, bucketName, key, fileStream) {
        return await c.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileStream,
            ContentType: this.getContentType(key)
        }));
    }

    getContentType(filename) {
        const ext = path.extname(filename).toLowerCase();
        const contentTypes = {
            '.pdf': 'application/pdf',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.txt': 'text/plain',
            '.csv': 'text/csv',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xls': 'application/vnd.ms-excel',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.doc': 'application/msword',
            '.json': 'application/json'
        };
        return contentTypes[ext] || 'application/octet-stream';
    }

}

// Export as module
const uploadFileInstance = new UploadFile();
module.exports = {
    handler: uploadFileInstance.handler.bind(uploadFileInstance),
    htmlToPdfBuffer: htmlToPdfBuffer
};