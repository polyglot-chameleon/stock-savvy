import useTimeframe from "../store/TimeFrameStore";

export default function TimeFrameDropdown() {
  const { setTimeframe } = useTimeframe();
  return (
    <select
      className="p-2 bg-green-100 rounded-2xl"
      onChange={(ev) => setTimeframe(Number(ev.target.value))}
    >
      <option value="7">1 Week</option>
      <option value="30">1 Month</option>
      <option value="90">3 Months</option>
      <option value="180">6 Months</option>
      <option value="365">1 Year</option>
    </select>
  );
}
