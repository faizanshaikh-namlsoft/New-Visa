const express = require('express');
const fs = require('fs');
const https = require('https');
const visaPaymentRoute = require('./routes/visaPayment');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Read your key and certificate files
const key = fs.readFileSync('config/key.pem');
const cert = fs.readFileSync('config/cert.pem');

// Create an HTTPS agent with your key and certificate
const agent = new https.Agent({
  key: key,
  cert: cert
});

// Use the Visa payment route
app.use('/visa-payment', visaPaymentRoute(agent));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
