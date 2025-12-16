"use client";

import { useEffect, useRef, useState } from "react";
import useData from "./useData";
import Metrics from "./metrics/Metrics";
import AnalystRatingBarometer from "./ratings/AnalystRatingBarometer";
import TimeFrameDropdown from "./TimeFrameDropdown";
import NewsFeed from "./newsfeed/NewsFeed";

export default function Dashboard() {
  const [pointInTime, setPointInTime] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [timeFrame, setTimeFrame] = useState<number>(7);
  const [metrics, setMetrics] = useState<any[]>([]);
  const chartRef = useRef(null);

  useData(chartRef, setPointInTime, timeFrame, setDate);

  const fetchMetrics = async () => {
    const response = await fetch("/api/metrics");
    const data = await response.json();
    setMetrics(data);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <section>
      <TimeFrameDropdown setTimeFrame={(tf: number) => setTimeFrame(tf)} />
      <div ref={chartRef} id="chart" />
      <Metrics metrics={metrics[pointInTime]} />
      <section className="grid grid-cols-2">
        <AnalystRatingBarometer date={date} />
        <NewsFeed date={date} />
      </section>
    </section>
  );
}
