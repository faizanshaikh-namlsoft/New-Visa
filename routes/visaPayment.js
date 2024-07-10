const express = require('express');
const axios = require('axios');
const { generateXPayToken } = require('../utils/tokenGenerator');

module.exports = (agent) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { amount, currency, recipient } = req.body;

    // Visa Direct API endpoint
    const url = 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions';
    const resourcePath = '/visadirect/fundstransfer/v1/pushfundstransactions';
    const queryString = ''; // Add your query string if any

    // Request payload
    const payload = JSON.stringify({
      amount,
      currency, // Ensure currency is in the correct format (e.g., 'USD')
      recipient
    });

    // Generate x-pay-token
    const xPayToken = generateXPayToken(resourcePath, queryString, payload, 'your_shared_secret');

    try {
      const response = await axios.post(url, payload, {
        httpsAgent: agent,
        auth: {
          username: 'P0XAWZQXFY1XJ51XUXT421H2nXQ7VSfCz5jjehVxM7WvcLK98',
          password: 'RTRx83th2Ovx4WAy3'
        },
        headers: {
          'Content-Type': 'application/json',
          'x-pay-token': xPayToken
        }
      });

      res.status(200).send(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).send(error.response ? error.response.data : error.message);
    }
  });

  return router;
};
