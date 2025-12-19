import { useEffect, useState } from "react";
import { NewsItem, Sentiment } from "@/generated/prisma/browser";
import useCompany from "@/app/store/CompanyStore";
import useTimeIdx from "@/app/store/TimeIdxStore";

export default function NewsFeed() {
  const [newsItems, setNewsItems] = useState<Partial<NewsItem>[]>([]);
  const { company } = useCompany();
  const { timeIdx } = useTimeIdx();

  const fetchNews = async () =>
    setNewsItems(
      await (
        await fetch(
          `/api/news/${company.id}?date=${company.shareValues[timeIdx].date}`
        )
      ).json()
    );

  useEffect(() => {
    fetchNews();
  }, [timeIdx]);

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
