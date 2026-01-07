const playwright = require("playwright");

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

module.exports = { htmlToPdfBuffer };