import type { NewsArticle } from "../types/news";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function getTopHeadlines(): Promise<NewsArticle[]> {
    if (!API_KEY) {
        throw new Error("Missing VITE_NEWS_API_KEY in .env");
    }

    const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&pageSize=20&apikey=${API_KEY}`
    );

    const data = await response.json();
    console.log("NewsAPI response:", data);
    
    if (!response.ok){
        throw new Error(data.message || "Failed to fetch news");
    }

    return data.articles;
}