import { RefObject, useEffect } from "react";
import * as echarts from "echarts";

export default function useData(
  chartRef: RefObject<HTMLElement | null>,
  setPointInTime: (index: number) => void,
  timeFrame: number
) {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const options = {
      xAxis: {
        type: "category",
        data: Array.from({ length: 365 }, () =>
          new Date(Date.now()).toDateString()
        ).slice(365 - timeFrame, 365),
      },
      yAxis: {
        type: "value",
      },
      emphasis: {
        focus: "series",
      },
      series: [
        {
          data: Array.from({ length: 365 }, () =>
            Math.floor(Math.random() * 200)
          ).slice(365 - timeFrame, 365),
          type: "line",
        },
        {
          data: Array.from({ length: 365 }, () =>
            Math.floor(Math.random() * 200)
          ).slice(365 - timeFrame, 365),
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
      setPointInTime(params.batch[0].dataIndex)
    );

    return () => {
      window.removeEventListener("resize", resizeChart);
      chart.dispose();
    };
  }, [chartRef, timeFrame]);
}
