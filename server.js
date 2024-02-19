const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://deploy2-hazel.vercel.app' }));
app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON requests

// API endpoint for fetching data (GET request)
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: 'f4cd38a719884bdc8de1bebf3a75eda6',
        country: 'us',
        category: 'general',
      },
    });

    const articles = response.data.articles;
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching data from News API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for handling data sent from the client (POST request)
app.post('/api/data', (req, res) => {
  const requestData = req.body; // Access the data sent in the request body
  console.log('Received data from client:', requestData);

  // Handle the data as needed
  // For example, you can store it in a database or perform other server-side operations

  // Send a response back to the client
  res.json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
