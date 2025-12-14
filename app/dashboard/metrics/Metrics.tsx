export default function Metrics({ metrics = {} }: { metrics: any }) {
  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(metrics).map((metric) => (
          <div className="p-1 bg-white rounded-lg shadow" key={metric}>
            <h3 className="text-lg font-semibold">{metric}</h3>
            <p className="text-3xl">{Number(metrics[metric]).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
