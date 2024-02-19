const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://deploy2-hazel.vercel.app' }));
app.use(express.static('public'));

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

    // Fetch the full content for each article
    const articlesWithContent = await Promise.all(
      articles.map(async (article) => {
        try {
          const articleResponse = await axios.get(article.url);
          article.fullText = articleResponse.data; // Assuming the full text is available in the response, adjust accordingly
          console.log(article.fullText)
        } catch (error) {
          console.error(`Error fetching content for ${article.title}:`, error.message);
          article.fullText = 'Error fetching content';
        }
        return article;
      })
    );

    res.json({ articles: articlesWithContent });
  } catch (error) {
    console.error('Error fetching data from News API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Deployed URL: ${process.env.DEPLOY_URL}`);
});
