"use client";

import { useRef } from "react";
import useCompany from "../store/CompanyStore";
import Metrics from "./metrics/Metrics";
import NewsFeed from "./newsfeed/NewsFeed";
import AnalystRatingBarometer from "./ratings/AnalystRatingBarometer";
import TimeFrameDropdown from "./TimeFrameDropdown";
import useData from "./useData";

export default function Dashboard() {
  const { company } = useCompany();
  const chartRef = useRef(null);

  useData(chartRef);

  return (
    <section>
      <TimeFrameDropdown />
      {company.ticker && (
        <h1 className="text-left ml-5">
          {company.name} ({company.ticker})
        </h1>
      )}
      <div ref={chartRef} id="chart" />
      {company.metrics && <Metrics />}
      <section className="grid grid-cols-2">
        <AnalystRatingBarometer />
        <NewsFeed />
      </section>
    </section>
  );
}
