import { useEffect } from "react";

export default function useNewsFeed(
  pointInTime: number,
  setNewsItems: (newsItems: Array<{ title: string; timestamp: Date }>) => void
) {
  useEffect(() => {
    setNewsItems([
      {
        title: "News Item 1",
        timestamp: new Date(Date.now() - Math.random() * 1000000000),
      },
      {
        title: "News Item 2",
        timestamp: new Date(Date.now() - Math.random() * 1000000000),
      },
      {
        title: "News Item 3",
        timestamp: new Date(Date.now() - Math.random() * 1000000000),
      },
    ]);
  }, [pointInTime]);
}
