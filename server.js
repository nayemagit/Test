const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    // Make request to IMDb API
    const response = await fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${query}`, {
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY, // Replace with your RapidAPI key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from IMDb API');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
