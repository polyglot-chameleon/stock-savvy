import useMetrics from "../hooks/useMetrics";

export default function Metrics({ pointInTime }: { pointInTime: number }) {
  const metrics = useMetrics(pointInTime);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div className="p-4 bg-white rounded-lg shadow" key={index}>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl">{metric}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
