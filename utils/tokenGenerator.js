const crypto = require('crypto');

function generateXPayToken(resourcePath, queryString, requestBody, sharedSecret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const preHashString = timestamp + resourcePath + queryString + requestBody;
  const hash = crypto.createHmac('sha256', sharedSecret).update(preHashString).digest('hex');
  return `xv2:${timestamp}:${hash}`;
}

module.exports = { generateXPayToken };
