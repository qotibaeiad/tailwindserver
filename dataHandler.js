const axios = require('axios');

function handleDataRequest(mongoDB) {
  return async (req, res) => {
    try {
      const { category } = req.query;

      // Use MongoDB here if needed
      // Example: const dataFromMongoDB = await mongoDB.getData();

      // Make a request to the News API with the specified category
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: 'f4cd38a719884bdc8de1bebf3a75eda6',
          country: 'us',
          category: category,
        },
      });

      const articles = response.data.articles;
      // Send the articles back to the client
      res.json({ articles });
    } catch (error) {
      console.error('Error fetching data from News API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
function handleLoginRequest(mongoDB) {
    return async (req, res) => {
      try {
        const { username, password } = req.query;
  
        // Check the username and password in the MongoDB collection named 'users'
        const userCollection = mongoDB.db.collection('user');
        const user = await userCollection.findOne({ username, password });
  
        if (user) {
          res.json({ success: true, message: 'Login successful!' });
        } else {
          res.json({ success: false, message: 'Invalid credentials.' });
        }
      } catch (error) {
        console.error('Error handling login request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  }
  

module.exports = {
  handleDataRequest,
  handleLoginRequest,
};
