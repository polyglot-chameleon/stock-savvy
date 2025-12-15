import { RefObject, useEffect, useState } from "react";
import * as echarts from "echarts";

export default function useData(
  chartRef: RefObject<HTMLElement | null>,
  setPointInTime: (index: number) => void,
  timeFrame: number,
  setDate: (date: Date) => void
) {
  const [data, setData] = useState<number[]>([]);

  const getData = async () =>
    setData(await (await fetch(`/api/data?companyId=${1}`)).json());

  useEffect(() => {
    getData();

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const values = data
      .map((item: any) => item.closePrice.toFixed(2))
      .slice(365 - timeFrame, 365);
    const categories = data
      .map((item: any) => new Date(item.date).toLocaleDateString())
      .slice(365 - timeFrame, 365);

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

    chart.on("highlight", (params: any) => {
      setPointInTime(params.batch[0].dataIndex);
      setDate(new Date(categories[params.batch[0].dataIndex]));
    });

    return () => {
      window.removeEventListener("resize", resizeChart);
      chart.dispose();
    };
  }, [chartRef, timeFrame]);
}
