// server/index.js
// Minimal proxy server to call Gemini API so the API key stays server-side.
//
// Run with: node server/index.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // or native fetch if Node >= 18
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const GEMINI_ENDPOINT = process.env.GEMINI_ENDPOINT || 'https://api.openai.fake/gemini'; // replace with your real endpoint
const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error('Missing GEMINI_API_KEY in server .env');
  process.exit(1);
}

// POST /api/generate
app.post('/api/generate', async (req, res) => {
  try {
    const payload = req.body; // expected to be what your geminiService frontend sends
    // Replace below with the real Gemini API call / shape required by the model
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_KEY}`
      },
      body: JSON.stringify(payload)
    });
    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
