"use client";

import useCompany from "@/app/store/CompanyStore";
import useTimeframe from "@/app/store/TimeFrameStore";
import useTimeIdx from "@/app/store/TimeIdxStore";
import { Metric } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

export default function Metrics() {
  const [metrics, setMetrics] = useState<
    Pick<Metric, "d2e" | "eps" | "per" | "roe">
  >({ d2e: 0, eps: 0, per: 0, roe: 0 });
  const { company } = useCompany();
  const { timeIdx } = useTimeIdx();

  useEffect(() => setMetrics(company.metrics[timeIdx]), [company, timeIdx]);

  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        {metrics &&
          Object.keys(metrics)
            .filter((k) => ["eps", "per", "d2e", "roe"].includes(k))
            .map((metric) => (
              <div className="p-1 bg-white rounded-lg shadow" key={metric}>
                <h3 className="text-lg font-semibold">{metric}</h3>
                <p className="text-3xl">{Number(metrics[metric]).toFixed(2)}</p>
              </div>
            ))}
      </div>
    </section>
  );
}
