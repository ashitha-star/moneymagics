// utils/document/documentTemplate
const DocumentTypes = {
  QUOTE: {
    title: 'SALES QUOTE',
    numberLabel: 'Quote #',
    partyLabel: 'BILL TO',
    footer: 'This quote is valid until the expiry date.'
  },
  SALES_INVOICE: {
    title: 'SALES INVOICE',
    numberLabel: 'Invoice #',
    partyLabel: 'BILL TO',
    footer: 'Please make payment before due date.'
  },
  PURCHASE_INVOICE: {
    title: 'PURCHASE INVOICE',
    numberLabel: 'Invoice #',
    partyLabel: 'SUPPLIER',
    footer: 'For internal accounting use.'
  },
  PAYMENT: {
    title: 'PAYMENT RECEIPT',
    numberLabel: 'Receipt #',
    partyLabel: 'RECEIVED FROM',
    footer: 'Payment received successfully.'
  }
};

function documentTemplate(data) {
  const { title, company, party, document, items, totals, footerNote, message } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 800px; background: #fff; margin: auto; padding: 30px; border-radius: 6px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    h1 { margin: 0; font-size: 22px; }
    .right { text-align: right; }
    .box { background: #f7f7f7; padding: 15px; border-radius: 4px; display: flex; justify-content: space-between; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 10px; font-size: 13px; border-bottom: 1px solid #eee; }
    th { background: #f7f7f7; }
    .total { font-weight: bold; font-size: 16px; color: #0a7d3b; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    ${message ? `
    <div style="margin-bottom:20px;">
        ${message}
    </div>
    ` : ''}
    <div class="header">
      <div><strong>${company.name}</strong><br/>${company.address || ''}<br/>${company.city || ''}</div>
      <div class="right"><h1>${title}</h1><div>${document.numberLabel}: ${document.number}</div><div>Date: ${document.date}</div></div>
    </div>
    <div class="box">
      <div><strong>${document.partyLabel}</strong><br/>${party.name}<br/>${party.address || ''}<br/>${party.email || ''}</div>
      <div><strong>DETAILS</strong><br/>Status: ${document.status || '-'}<br/>Ref: ${document.reference || '-'}</div>
    </div>
    ${items?.length ? `
    <table><thead><tr><th>#</th><th>Item</th><th>Qty</th><th class="right">Rate</th><th class="right">Amount</th></tr></thead>
    <tbody>${items.map((item, i) => `<tr><td>${i + 1}</td><td>${item.name}</td><td>${item.quantity}</td><td class="right">₹ ${item.rate}</td><td class="right"><strong>₹ ${item.amount}</strong></td></tr>`).join('')}</tbody></table>
    ` : ''}
    <table style="margin-top:20px;">${totals.map(t => `<tr><td class="right">${t.label}</td><td class="right ${t.isGrand ? 'total' : ''}">₹ ${t.value}</td></tr>`).join('')}</table>
    <div class="footer">${footerNote}</div>
  </div>
</body>
</html>`;
}

function buildDocument(type, payload) {
  const doc = DocumentTypes[type];
  if (!doc) throw new Error(`Invalid document type: ${type}`);
  
  return documentTemplate({
    title: doc.title,
    company: payload.company,
    party: payload.party,
    document: {
      numberLabel: doc.numberLabel,
      partyLabel: doc.partyLabel,
      number: payload.document_number,
      date: payload.document_date,
      status: payload.status,
      reference: payload.reference
    },
    items: payload.items || [],
    totals: payload.totals || [],
    footerNote: doc.footer
  });
}

module.exports = { DocumentTypes, documentTemplate, buildDocument };