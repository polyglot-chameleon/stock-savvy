import useMetrics from "./useMetrics";

export default function Metrics({ pointInTime }: { pointInTime: number }) {
  const metrics = useMetrics(pointInTime);

  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div className="p-1 bg-white rounded-lg shadow" key={index}>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl">{metric}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
