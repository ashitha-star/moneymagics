import * as T from 'types';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

async function main(g: T.IAMGlobal) {
    try {
        const file = g.req?.body?.files?.[0];
        if (!file) return { ok: false, message: 'Upload a file' };
        
        const filePath = `/usr/src/app/uploads/${file.filename}`;
        const ext = path.extname(file.originalname).toLowerCase();
        
        let result: any = {};
        
        if (ext === '.xlsx' || ext === '.xls') {
            // Excel
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            result = {
                type: 'Excel',
                headers: data[0] || [],
                rows: data.slice(1, 6),
                total: data.length - 1
            };
            
        } else if (ext === '.csv') {
            // CSV
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n').filter(l => l.trim());
            const rows = lines.map(line => line.split(','));
            
            result = {
                type: 'CSV',
                headers: rows[0] || [],
                rows: rows.slice(1, 6),
                total: rows.length - 1
            };
            
        } else {
            // Text/Other
            const content = fs.readFileSync(filePath, 'utf-8');
            
            result = {
                type: 'Text',
                content: content.substring(0, 500),
                length: content.length
            };
        }
        
        return {
            ok: true,
            fileName: file.originalname,
            extension: ext,
            ...result
        };

    } catch (e) {
        return { ok: false, error: e.message };
    }
}

module.exports = main;