export default function Metrics() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-3xl">567</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Conversion Rate</h3>
          <p className="text-3xl">4.56%</p>
        </div>
      </div>
    </section>
  );
}
