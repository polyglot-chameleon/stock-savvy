import { RefObject, useEffect } from "react";
import * as echarts from "echarts";

export default function useData(
  chartRef: RefObject<HTMLElement | null>,
  setPointInTime: (index: number) => void
) {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const options = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      emphasis: {
        focus: "series",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
        {
          data: [123, 275, 280, 133, 135, 140, 135],
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
  }, [chartRef]);
}
