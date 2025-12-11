export default function SearchPanel() {
  return (
    <search>
      <input type="search" name="q" className="p-2 bg-blue-100" />
      <button className="bg-blue-100 hover:bg-blue-300 rounded-2xl p-2">
        Search
      </button>
    </search>
  );
}
