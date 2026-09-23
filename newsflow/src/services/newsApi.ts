import type {newsArticle} from " ../types/news";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function getTopHeadlines(): Promise<NewsArticle[]> {
    const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&pageSize=20&apikey=${API_KEY}`
    );
    
    if (!response.ok){
        throw new Error("Failed to fetch news ");
    }
    
    const data = await response.json();
    return data.articles;
}