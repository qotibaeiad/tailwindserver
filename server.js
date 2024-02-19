const express = require('express');
const cors = require('cors'); // Add this line to include the cors middleware

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

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
