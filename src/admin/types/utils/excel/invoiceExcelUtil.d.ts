declare const XLSX: any;
declare const path: any;
declare function generateAndSaveExcel({ headers, data, folderPath, fileName }: {
    headers: any;
    data: any;
    folderPath: any;
    fileName: any;
}): Promise<any>;