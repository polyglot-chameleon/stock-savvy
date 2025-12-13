import Dashboard from "./dashboard/Dashboard";
import SearchPanel from "./search/SearchPanel";

export default function Home() {
  return (
    <main className="text-center">
      <SearchPanel />
      <Dashboard />
    </main>
  );
}
