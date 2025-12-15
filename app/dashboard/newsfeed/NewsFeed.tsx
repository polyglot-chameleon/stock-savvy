import { useState } from "react";
import useNewsFeed from "./useNewsFeed";
import { NewsItem, Sentiment } from "@/generated/prisma/browser";

export default function NewsFeed({ date }: { date: Date }) {
  const [newsItems, setNewsItems] = useState<Partial<NewsItem>[]>([]);

  useNewsFeed(date, setNewsItems);

  return (
    <section className="p-4 rounded-2xl">
      {newsItems.map((n) => (
        <article
          key={n.id}
          className={
            n.sentiment === Sentiment.POSITIVE
              ? "bg-green-300"
              : n.sentiment === Sentiment.NEGATIVE
              ? "bg-red-300"
              : ""
          }
        >
          {n.title} - <time>{n.date}</time>
        </article>
      ))}
    </section>
  );
}
