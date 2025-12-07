import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/caption', async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) return res.status(400).json({ error: 'videoId is required' });

  const url = `https://www.youtube.com/api/timedtext?lang=ko&v=${videoId}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader('Content-Type', 'text/xml');
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: 'caption fetch failed', detail: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Caption server running on', port));
