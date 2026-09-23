import { useEffect, useState } from "react";
import { getTopHeadlines } from "./services/newsApi";
import type { NewsArticle } from "./types/news";
import NewsGrid from "./components/NewsGrid";
import "./App.css";

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const news = await getTopHeadlines();
        setArticles(news);
      } catch (err) {
        console.error(err);
        setError("Could not load the latest news.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return <div className="status">Loading latest news...</div>;
  }

  if (error) {
    return <div className="status error">{error}</div>;
  }

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          NEWS<span>FLOW</span>
        </div>

        <nav>
          <a href="#">Home</a>
          <a href="#">World</a>
          <a href="#">Africa</a>
          <a href="#">Technology</a>
          <a href="#">Climate</a>
        </nav>

        <button className="search-button">
          🔍
        </button>
      </header>

      <main>

        <section className="hero">
          <div>
            <span className="live-badge">
              🔴 LIVE
            </span>

            <h1>
              Stay informed.
              <br />
              Stay connected.
            </h1>

            <p>
              Real-time news from around the world,
              with Africa in focus.
            </p>
          </div>
        </section>

        <NewsGrid articles={articles} />

      </main>

    </div>
  );
}

export default App;