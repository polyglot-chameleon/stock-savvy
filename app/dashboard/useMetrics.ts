export default function useMetrics(pointInTime: number) {
  return [
    Math.round(pointInTime * Math.random() * 100),
    Math.round(pointInTime * Math.random() * 100),
    Math.round(pointInTime * Math.random() * 100),
  ];
}
