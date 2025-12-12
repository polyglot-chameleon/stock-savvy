"use client";

import { useRef, useState } from "react";
import useData from "../hooks/useData";
import Metrics from "./Metrics";
import AnalystRatingBarometer from "./AnalystRatingBarometer";
import TimeFrameDropdown from "./TimeFrameDropdown";

export default function Dashboard() {
  const [pointInTime, setPointInTime] = useState<number>(0);
  const [timeFrame, setTimeFrame] = useState<number>(7);

  const chartRef = useRef(null);
  useData(chartRef, setPointInTime, timeFrame);

  return (
    <section>
      <TimeFrameDropdown setTimeFrame={(tf: number) => setTimeFrame(tf)} />
      <div ref={chartRef} id="chart" />
      <Metrics pointInTime={pointInTime} />
      <AnalystRatingBarometer pointInTime={pointInTime} />
    </section>
  );
}
