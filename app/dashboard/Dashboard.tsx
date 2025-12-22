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
      {company.ticker && (
        <section className="flex gap-x-10">
          <h1 className="text-left ml-5 text-2xl">
            {company.name} ({company.ticker})
          </h1>
          <TimeFrameDropdown />
        </section>
      )}

      <section className="grid sm:grid-cols-1 md:grid-cols-[max-content_0.85fr]">
        <div ref={chartRef} id="chart" />
        {company.metrics && <Metrics />}
      </section>

      {company.ticker && (
        <section className="grid sm:grid-cols-1 md:grid-cols-2">
          <AnalystRatingBarometer />
          <NewsFeed />
        </section>
      )}
    </section>
  );
}
