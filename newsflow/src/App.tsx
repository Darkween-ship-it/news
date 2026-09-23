import { useEffect, useState } from 'react';
import { getTopHeadlines } from "./services/newsApi";
import type {newsArticle} from "./types/news";

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(" ");

  useEffect(() => {
    async function loadNews() {
      try {
        const news = await getTopHeadlines();
        setArticles(news);
      }catch (err) {
        setError("Failed to fetch news");
        console.error(err);
      }finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return <h1>Loading latest news...</h1>
  }

  if(error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>NEWSFLOW</h1>

      {articles.map((article, index) => (
        <article key={`${article.url}-${index}`}>
          <h2>{article.title}</h2>

          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} width="300" />
          )}

          <p>{article.description}</p>

          <small>
            {article.source.name} - {" "}
            {new Date(article.publishedAt).toLocaleString()}
          </small>
        </article>
      ))}
    </main>
  );
}

export default App;
