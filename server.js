const express = require('express');
const cors = require('cors');
const MongoDB = require('./mongodb');
const dataHandler = require('./dataHandler');

const app = express();
const port = process.env.PORT || 3000;

// Explicitly set allowed origins
app.use(cors({ origin: 'https://deploy2-hazel.vercel.app' }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Connect to MongoDB
const mongoDB = new MongoDB('mongodb+srv://qotibaeiad98:hrqk7o7dHydnV49a@newtailwind.wce8sqn.mongodb.net/?retryWrites=true&w=majority', 'tailwindweb');

(async () => {
  try {
    await mongoDB.connect();

    // API endpoint for fetching data
    app.get('/api/data', dataHandler.handleDataRequest(mongoDB));

    // API endpoint for login
    app.get('/api/login', dataHandler.handleLoginRequest(mongoDB));
  } catch (error) {
    console.error('Error initializing MongoDB:', error.message);
  }
})();

// Start the server
app.listen(port, () => {
  console.log(`Deployed URL: ${process.env.DEPLOY_URL}`);
});
