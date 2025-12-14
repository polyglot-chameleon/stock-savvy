import { useState } from "react";
import useNewsFeed from "./useNewsFeed";

export default function NewsFeed({ pointInTime }: { pointInTime: number }) {
  const [newsItems, setNewsItems] = useState<
    Array<{ title: string; timestamp: Date }>
  >([]);

  useNewsFeed(pointInTime, setNewsItems);

  return (
    <section className="p-4 rounded-2xl">
      {newsItems.map((n) => (
        <article key={n.title}>
          {n.title} - <time>{n.timestamp.toLocaleDateString()}</time>
        </article>
      ))}
    </section>
  );
}
