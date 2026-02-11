import * as T from 'types';
import * as fs from 'fs';

async function main(g: T.IAMGlobal) {
    try {
        const files = g.req.body.files;

        if (!files || !Array.isArray(files) || files.length === 0) {
            throw new Error('No file uploaded');
        }

        const file = files[0];

        /**
         * IMPORTANT:
         * API Maker stores the file here and exposes the REAL path
         * via request info, not via file.buffer or stream
         */
        const filePath =
            file.path ||
            g.req?.info?.path ||
            g.req?.info?.files?.[0]?.path;

        if (!filePath || !fs.existsSync(filePath)) {
            throw new Error(`Uploaded file not found at path: ${filePath}`);
        }

        // ✅ READ FILE (NO STORE, NO S3)
        const fileBuffer = fs.readFileSync(filePath);

        return {
            success: true,
            message: 'File read successfully',
            data: {
                filename: file.originalname || file.filename,
                mimetype: file.mimetype,
                size: fileBuffer.length,
                buffer: fileBuffer,
                base64: fileBuffer.toString('base64')
            }
        };

    } catch (e) {
        throw [{
            message: 'Unable to read uploaded file',
            systemMessage: e.message,
            code: T.EStatusCode.BAD_REQUEST,
            stack: e.stack
        }];
    }
}

module.exports = main;