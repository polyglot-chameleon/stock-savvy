"use client";

import useCompany from "@/app/store/CompanyStore";
import useTimeIdx from "@/app/store/TimeIdxStore";
import { Metric } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

type MetricType = Pick<Metric, "d2e" | "eps" | "per" | "roe">;
type Labels = {
  [K in keyof MetricType]: string;
};

export default function Metrics() {
  const [metrics, setMetrics] = useState<MetricType>({
    d2e: 0,
    eps: 0,
    per: 0,
    roe: 0,
  });
  const { company } = useCompany();
  const { timeIdx } = useTimeIdx();

  const labels: Labels = {
    d2e: "Debt to Earnings",
    eps: "Earnings/Share",
    per: "Price/Earnings",
    roe: "Return on Equity",
  } as const;

  useEffect(() => setMetrics(company.metrics[timeIdx]), [company, timeIdx]);

  return (
    <section className="flex flex-wrap gap-x-2 h-10vh">
      {metrics &&
        Object.keys(metrics)
          .filter((k) => ["eps", "per", "d2e", "roe"].includes(k))
          .map((metric) => (
            <div className="p-1 bg-white rounded-lg shadow h-20" key={metric}>
              <code className="text-lg font-semibold">{labels[metric]}</code>
              <p className="text-3xl">{Number(metrics[metric]).toFixed(2)}</p>
            </div>
          ))}
    </section>
  );
}
