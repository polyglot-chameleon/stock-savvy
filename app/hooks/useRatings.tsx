import * as echarts from "echarts";
import { RefObject, useEffect } from "react";

export default function useRatings(
  barometerRef: RefObject<HTMLElement | null>,
  pointInTime: number
) {
  useEffect(() => {
    if (!barometerRef.current) return;
    const barometer = echarts.init(barometerRef.current as HTMLElement);

    barometer.setOption({
      series: [
        {
          type: "gauge",
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: "80%",
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, "#67e0e3"],
                [0.7, "#37a2da"],
                [1, "#fd666d"],
              ],
            },
          },
          splitLine: {
            distance: -18,
            length: 18,
            lineStyle: {
              color: "#0f0",
            },
          },
          axisTick: {
            distance: -12,
            length: 10,
            lineStyle: {
              color: "#0f0",
            },
          },
          axisLabel: {
            distance: -50,
            color: "#0f0",
            fontSize: 25,
          },
          pointer: {
            offsetCenter: [0, "10%"],
            icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
            length: "115%",
            itemStyle: {
              color: "#000",
            },
          },
          detail: {
            valueAnimation: true,
            precision: 1,
          },
          title: {
            offsetCenter: [0, "-50%"],
          },
          data: [
            {
              value: pointInTime * 14.28,
              name: "Rating",
            },
          ],
        },
      ],
    });

    const resizeChart = () => barometer.resize();
    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
      barometer.dispose();
    };
  }, [barometerRef, pointInTime]);
}
