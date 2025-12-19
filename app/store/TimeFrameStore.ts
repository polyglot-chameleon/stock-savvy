import { create } from "zustand";

type TimeFrameStore = {
  timeframe: number;
  setTimeframe: (idx: number) => void;
};

const useTimeframe = create<TimeFrameStore>((set) => ({
  timeframe: 7,
  setTimeframe: (timeframe: number) => set({ timeframe }),
}));

export default useTimeframe;
