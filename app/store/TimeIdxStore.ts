import { create } from "zustand";

type TimeIdxStore = { timeIdx: number; setTimeIdx: (idx: number) => void };

const useTimeIdx = create<TimeIdxStore>((set) => ({
  timeIdx: 0,
  setTimeIdx: (timeIdx: number) => set({ timeIdx }),
}));

export default useTimeIdx;
