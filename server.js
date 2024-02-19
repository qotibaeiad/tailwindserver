const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios for making HTTP requests

const app = express();
const port = process.env.PORT || 3000;

// Explicitly set allowed origins
app.use(cors({ origin: 'https://deploy2-hazel.vercel.app' }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint for fetching data
app.get('/api/data', async (req, res) => {
    try {
      const { category } = req.query;
  
      // Make a request to the News API with the specified category
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: 'f4cd38a719884bdc8de1bebf3a75eda6',
          country: 'il',
          category: category, // Default to 'general' if no category is provided
        },
      });
  
      const articles = response.data.articles;
      // Send the articles back to the client
      res.json({ articles });
    } catch (error) {
      console.error('Error fetching data from News API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Deployed URL: ${process.env.DEPLOY_URL}`);
});
