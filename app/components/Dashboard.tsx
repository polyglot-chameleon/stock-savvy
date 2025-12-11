"use client";

import { useRef } from "react";
import useData from "../hooks/useData";
import Metrics from "./Metrics";
import AnalystRatingBarometer from "./AnalystRatingBarometer";

export default function Dashboard() {
  const chartRef = useRef(null);

  useData(chartRef);

  return (
    <section>
      <div ref={chartRef} id="chart" />
      <Metrics />
      <AnalystRatingBarometer />
    </section>
  );
}
