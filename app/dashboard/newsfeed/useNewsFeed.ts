import { NewsItem } from "@/generated/prisma/client";
import { useEffect } from "react";

export default function useNewsFeed(
  date: Date,
  setNewsItems: (newsItems: NewsItem[]) => void
) {
  const fetchNews = async () => {
    const response = await fetch(`/api/news?date=${date.toISOString()}`);
    const data = await response.json();
    setNewsItems(data);
  };

  useEffect(() => {
    fetchNews();
  }, [date]);
}
