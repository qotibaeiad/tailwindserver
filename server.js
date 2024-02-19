const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Explicitly set allowed origins
app.use(cors({ origin: 'https://deploy2-hazel.vercel.app' }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint for fetching data
app.get('/api/data', (req, res) => {
  const responseData = { message: 'Data from the server!' };
  res.json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Deployed URL: ${process.env.DEPLOY_URL}`);
});
