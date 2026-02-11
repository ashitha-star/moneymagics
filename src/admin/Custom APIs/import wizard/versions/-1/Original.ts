// import * as T from 'types';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as XLSX from 'xlsx';
// import * as C from 'utils/Constants';

// function getCollection(entity: string) {
//   const map: any = {
//     customer: 'customers',
//     supplier: 'suppliers',
//     item: 'items',
//     items: 'items'
//   };

//   if (!map[entity]) throw new Error('Invalid entity');
//   return map[entity];
// }

// function mapRows(headers: string[], rows: any[][], mapping: any) {
//   const headerIndex: any = {};
//   headers.forEach((h, i) => headerIndex[h.trim()] = i);

//   return rows.map(row => {
//     const obj: any = {};
//     for (const dbField in mapping) {
//       const header = mapping[dbField];
//       if (headerIndex[header] !== undefined) {
//         obj[dbField] = row[headerIndex[header]];
//       }
//     }
//     return obj;
//   });
// }

// async function main(g: T.IAMGlobal) {
//   try {
//     const entity = g.req.body?.entity?.toLowerCase();
//     const mapping =
//       typeof g.req.body.mapping === 'string'
//         ? JSON.parse(g.req.body.mapping)
//         : g.req.body.mapping;

//     const file = g.req.body?.files?.[0];

//     if (!entity || !mapping || !file) {
//       return { success: false, message: 'entity, mapping and file are required' };
//     }

//     const collection = getCollection(entity);
//     const filePath = `/usr/src/app/uploads/${file.filename}`;
//     const ext = path.extname(file.originalname).toLowerCase();

//     let headers: string[] = [];
//     let rows: any[][] = [];

//     if (ext === '.xlsx' || ext === '.xls') {
//       const wb = XLSX.readFile(filePath);
//       const sheet = wb.Sheets[wb.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       headers = data[0] as string[];
//       rows = data.slice(1);
//     }

//     if (ext === '.csv') {
//       const content = fs.readFileSync(filePath, 'utf-8');
//       const lines = content.split('\n').filter(Boolean);
//       const parsed = lines.map(l => l.split(','));

//       headers = parsed[0];
//       rows = parsed.slice(1);
//     }

//     if (!headers.length || !rows.length) {
//       return { success: false, message: 'No data found in file' };
//     }

//     const records = mapRows(headers, rows, mapping);

//     await g.sys.db.saveSingleOrMultiple({
//       instance: C.instance,
//       database: C.db,
//       collection,
//       saveData: records
//     });

//     return {
//       success: true,
//       entity,
//       collection,
//       inserted: records.length
//     };

//   } catch (e) {
//     return { success: false, error: e.message };
//   }
// }

// module.exports = main;


import * as T from 'types';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import * as C from 'utils/Constants';

function getCollection(entity: string) {
  console.log('[IMPORT] Resolving collection for entity:', entity);

  const map: any = {
    customer: 'customers',
    supplier: 'suppliers',
    item: 'item',
    items: 'item'
  };

  if (!map[entity]) throw new Error(`Invalid entity: ${entity}`);
  return map[entity];
}

function mapRows(headers: string[], rows: any[][], mapping: any) {
  console.log('[IMPORT] Mapping rows...');
  console.log('[IMPORT] Headers:', headers);
  console.log('[IMPORT] Mapping config:', mapping);
  console.log('[IMPORT] Total rows:', rows.length);

  const headerIndex: any = {};
  headers.forEach((h, i) => headerIndex[h.trim()] = i);

  const mappedRows = rows.map((row, i) => {
    const obj: any = {};

    for (const dbField in mapping) {
      const header = mapping[dbField];
      const index = headerIndex[header];

      if (index !== undefined) {
        obj[dbField] = row[index];
      }
    }

    if (i < 3) {
      console.log(`[IMPORT] Sample mapped row ${i + 1}:`, obj);
    }

    return obj;
  });

  return mappedRows;
}

async function main(g: T.IAMGlobal) {
  console.log('\n========== IMPORT API START ==========');

  try {
    console.log('[IMPORT] Raw request body:', g.req.body);

    const entity = g.req.body?.entity?.toLowerCase();
    const rawMapping = g.req.body?.mapping;
    const file = g.req.body?.files?.[0];

    console.log('[IMPORT] Entity:', entity);
    console.log('[IMPORT] Raw mapping:', rawMapping);
    console.log('[IMPORT] File info:', file);

    if (!entity || !rawMapping || !file) {
      console.log('[IMPORT] Missing required inputs');
      return { success: false, message: 'entity, mapping and file are required' };
    }

    const mapping =
      typeof rawMapping === 'string'
        ? JSON.parse(rawMapping)
        : rawMapping;

    const collection = getCollection(entity);
    console.log('[IMPORT] Target collection:', collection);

    // const filePath = file.path;
    const filePath = path.join(
        '/usr/src/app/uploads',
        file.filename
    );

    const ext = path.extname(file.originalname).toLowerCase();

    console.log('[IMPORT] File path:', filePath);
    console.log('[IMPORT] File extension:', ext);

    let headers: string[] = [];
    let rows: any[][] = [];

    if (ext === '.xlsx' || ext === '.xls') {
      console.log('[IMPORT] Reading Excel file...');

      const wb = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      headers = data[0] as string[];
      rows = data.slice(1);
    } else if (ext === '.csv') {
      console.log('[IMPORT] Reading CSV file...');

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(Boolean);
      const parsed = lines.map(l => l.split(','));

      headers = parsed[0];
      rows = parsed.slice(1);
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }

    console.log('[IMPORT] Parsed headers:', headers);
    console.log('[IMPORT] Parsed rows count:', rows.length);

    if (!headers.length || !rows.length) {
      return { success: false, message: 'No data found in file' };
    }

    const records = mapRows(headers, rows, mapping);

    console.log('[IMPORT] Final record count:', records.length);
    console.log('[IMPORT] Saving via GEN DB API...');

    const dbResult = await g.sys.db.saveSingleOrMultiple({
        instance: C.instance,
        database: C.db,
        collection,
        saveData: records
        });


    console.log('[IMPORT] DB GEN SAVE RESULT:', dbResult);

    console.log('========== IMPORT API SUCCESS ==========\n');

    return {
      success: true,
      entity,
      collection,
      inserted: records.length
    };

  } catch (e: any) {
    console.error('\n========== IMPORT API ERROR ==========');
    console.error('[IMPORT ERROR RAW]:', e);

    // Handle API Maker array-style errors
    if (Array.isArray(e)) {
      console.error('[IMPORT ERROR ARRAY]:', e);
      return {
        success: false,
        error: e[0]?.message || 'Database error'
      };
    }

    console.error('[IMPORT ERROR MESSAGE]:', e?.message);
    console.error('[IMPORT ERROR STACK]:', e?.stack);

    return {
      success: false,
      error: e?.message || 'Unknown import error'
    };
  }
}

module.exports = main;