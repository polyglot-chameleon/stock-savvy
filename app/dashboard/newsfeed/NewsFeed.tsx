"use client";

import { useEffect, useState } from "react";
import { NewsItem } from "@/generated/prisma/browser";
import useCompany from "@/app/store/CompanyStore";
import useTimeIdx from "@/app/store/TimeIdxStore";

export default function NewsFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
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
    <section>
      {newsItems.map(({ id, sentiment, title, date }) => (
        <article
          key={id}
          className={`w-[45vw] p-3 m-auto mb-1 rounded-4xl ${getBgColor(
            sentiment
          )}`}
        >
          <em>{title}</em> - <time>{date}</time>
        </article>
      ))}
    </section>
  );
}

const getBgColor = (sentiment: number): string =>
  `bg-${sentiment > 0 ? "green" : "red"}-${clamp(Math.abs(sentiment) * 500)}`;

const clamp = (value: number) =>
  [100, 200, 300, 400, 500].reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
