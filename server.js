const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint for fetching data
app.get('/api/data', (req, res) => {
  const responseData = { message: 'Data from the server!' };
  res.json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Deployed URL: ${process.env.DEPLOY_URL}`);
});
