import * as T from 'types';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

async function main(g: T.IAMGlobal) {
    try {
        const s3Secret = await g.sys.system.getSecret('aws-s3-bucket');
        const s3Config = s3Secret["1.0.0"];
        
        const bucketName = "moneymagics-s3bucket";
        const folderPath = g.req.body.folderPath || "quotes/2025-12";
        
        const client = new S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey
            }
        });

        // Use MaxKeys=1000 to get more results
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: folderPath + '/',
            Delimiter: '/',
            MaxKeys: 1000 // Increased from default 1000
        });

        const response = await client.send(command);
        
        // Process folders
        const folders = [];
        if (response.CommonPrefixes) {
            response.CommonPrefixes.forEach(prefix => {
                if (prefix.Prefix) {
                    const fullPath = prefix.Prefix;
                    const folderName = fullPath
                        .replace(folderPath + '/', '')
                        .replace(/\/$/, '');
                    
                    if (folderName) {
                        folders.push({
                            id: folderName, // Use folder name as ID
                            name: `Folder ${folderName}`,
                            path: folderName
                        });
                    }
                }
            });
        }

        // Process files
        const files = [];
        if (response.Contents) {
            response.Contents.forEach(item => {
                if (item.Size > 0 && item.Key) {
                    const fileName = item.Key.split('/').pop();
                    files.push({
                        name: fileName,
                        path: item.Key,
                        size: item.Size
                    });
                }
            });
        }

        return {
            success: true,
            data: {
                bucket: bucketName,
                requested_path: folderPath,
                total_folders_found: folders.length,
                total_files_found: files.length,
                is_truncated: response.IsTruncated || false,
                folders: folders,
                files: files
            }
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = main;