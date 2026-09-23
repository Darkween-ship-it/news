import type { NewsArticle } from "../types/news";

interface NewsCardProps {
  article: NewsArticle;
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="news-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card-image"
        />
      )}

      <div className="news-card-content">
        <span className="news-source">
          {article.source.name}
        </span>

        <h2>{article.title}</h2>

        {article.description && (
          <p>{article.description}</p>
        )}

        <div className="news-card-footer">
          <span>
            {new Date(article.publishedAt).toLocaleString()}
          </span>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more →
          </a>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;