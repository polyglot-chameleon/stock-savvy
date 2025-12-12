"use client";

import { useRef, useState } from "react";
import useData from "../hooks/useData";
import Metrics from "./Metrics";
import AnalystRatingBarometer from "./AnalystRatingBarometer";

export default function Dashboard() {
  const [pointInTime, setPointInTime] = useState<number>(0);
  const chartRef = useRef(null);
  useData(chartRef, setPointInTime);

  return (
    <section>
      <div ref={chartRef} id="chart" />
      <Metrics pointInTime={pointInTime} />
      <AnalystRatingBarometer pointInTime={pointInTime} />
    </section>
  );
}
