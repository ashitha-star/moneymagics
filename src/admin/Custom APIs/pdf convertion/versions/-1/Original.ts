import * as T from 'types';
import { join } from 'path';
const playwright = require('playwright');

async function htmlToPdf() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  const filePath = join(__dirname, 'uploads', 'playwright.pdf');

  

  await page.setContent(html, { waitUntil: 'load' });

  await page.pdf({
    path: filePath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    },
  });

  await browser.close();

  // `filePath` contains the location of the generated PDF.
  // You can use this path to upload the file to a storage provider
  // or serve it for download.

}

async function main(g: T.IAMGlobal) {
  await htmlToPdf();
  return 'pdf created on the server';
}

module.exports = main;