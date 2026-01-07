export function salesQuoteHTML(data: any) {
  const {
    company,
    customer,
    quote,
    items,
    subtotal,
    tax,
    total
  } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      background: #fff;
      margin: auto;
      padding: 30px;
      border-radius: 6px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .title {
      text-align: right;
    }
    h1 {
      margin: 0;
      font-size: 22px;
    }
    .section {
      margin-bottom: 20px;
    }
    .box {
      background: #f7f7f7;
      padding: 15px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th {
      background: #f7f7f7;
      text-align: left;
      padding: 10px;
      font-size: 13px;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #eee;
      font-size: 13px;
    }
    .right {
      text-align: right;
    }
    .total {
      font-weight: bold;
      font-size: 16px;
      color: #0a7d3b;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- HEADER -->
    <div class="header">
      <div>
        <strong>${company.name}</strong><br/>
        ${company.address}<br/>
        ${company.city}
      </div>
      <div class="title">
        <h1>SALES QUOTE</h1>
        <div>Quote #: ${quote.number}</div>
        <div>Quote Date: ${quote.date}</div>
        <div>Expiry Date: ${quote.expiry}</div>
      </div>
    </div>

    <!-- BILL TO -->
    <div class="box section">
      <div>
        <strong>BILL TO</strong><br/>
        ${customer.name}<br/>
        ${customer.address}<br/>
        ${customer.email}<br/>
        ${customer.phone}
      </div>

      <div>
        <strong>QUOTE DETAILS</strong><br/>
        Quote Name: ${quote.name}
      </div>
    </div>

    <!-- ITEMS -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Type</th>
          <th>Qty</th>
          <th class="right">Rate</th>
          <th class="right">Tax</th>
          <th class="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.qty}</td>
            <td class="right">₹ ${item.rate}</td>
            <td class="right">₹ ${item.tax}</td>
            <td class="right"><strong>₹ ${item.amount}</strong></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <!-- TOTALS -->
    <table style="margin-top:20px;">
      <tr>
        <td class="right">Subtotal:</td>
        <td class="right">₹ ${subtotal}</td>
      </tr>
      <tr>
        <td class="right">Tax:</td>
        <td class="right">₹ ${tax}</td>
      </tr>
      <tr>
        <td class="right total">Total (INR):</td>
        <td class="right total">₹ ${total}</td>
      </tr>
    </table>

    <!-- FOOTER -->
    <div class="footer">
      Thank you for your business!<br/>
      Please make payment using the methods shared in the invoice email.
    </div>

  </div>
</body>
</html>
`;
}