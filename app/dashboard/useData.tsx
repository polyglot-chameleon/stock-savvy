import { RefObject, useEffect } from "react";
import * as echarts from "echarts";
import useCompany from "../store/CompanyStore";
import useTimeframe from "../store/TimeFrameStore";
import useTimeIdx from "../store/TimeIdxStore";

export default function useData(chartRef: RefObject<HTMLElement | null>) {
  const { company } = useCompany();
  const { timeframe } = useTimeframe();
  const { setTimeIdx } = useTimeIdx();

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const values = company
      .shareValues!.map((item: any) => item.closePrice.toFixed(2))
      .slice(365 - timeframe, 365);
    const categories = company
      .shareValues!.map((item: any) => new Date(item.date).toLocaleDateString())
      .slice(365 - timeframe, 365);

    const options = {
      xAxis: {
        type: "category",
        data: categories,
      },
      yAxis: {
        type: "value",
      },
      emphasis: {
        focus: "series",
      },
      series: [
        {
          data: values,
          type: "line",
        },
      ],
      tooltip: {
        order: "valueDesc",
        trigger: "axis",
      },
    };

    chart.setOption(options);

    const resizeChart = () => chart.resize();
    window.addEventListener("resize", resizeChart);

    chart.on("highlight", (params: any) =>
      setTimeIdx(params.batch[0].dataIndex)
    );

    return () => {
      window.removeEventListener("resize", resizeChart);
      chart.dispose();
    };
  }, [chartRef, timeframe, company]);
}
