import * as T from 'types';
// const fs = require('fs');
import * as fs from "fs";
const path = require('path');
const { chromium } = require('playwright');

async function main(g: T.IAMGlobal) {
    return fs.readdirSync(path.join(__dirname, "uploads"))
    // Place your code here.
    // try {
    //     const outDir = path.join(__dirname, 'uploads');
    //     if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    //     const browser = await chromium.launch({
    //         args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //         headless: true,
    //     });
    //     const page = await browser.newPage();

    //     console.log('Navigating to https://playwright.dev ...');
    //     await page.goto('https://playwright.dev', { waitUntil: 'networkidle' });

    //     const filename = path.join(outDir, 'playwright-dev.pdf');
    //     console.log('Generating PDF to', filename);
    //     await page.pdf({ path: filename, format: 'A4' });

    //     await browser.close();
    //     console.log('PDF generated:', filename);

    //     return {
    //         __am__downloadFilePath: path.basename(filename),
    //         __am__downloadFolderFileName: path.basename(filename)
    //     }
    // } catch (err) {
    //     console.error('Error generating PDF:', err);
    // }
    return g.req.body.files[0]
};
module.exports = main;