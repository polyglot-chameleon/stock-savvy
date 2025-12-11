import Dashboard from "./components/Dashboard";
import SearchPanel from "./components/SearchPanel";

export default function Home() {
  return (
    <main className="text-center">
      <SearchPanel />

      <Dashboard />
    </main>
  );
}
