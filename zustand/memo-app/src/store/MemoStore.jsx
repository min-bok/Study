import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMemoStore = create(
  persist(
    (set) => ({
      memoList: [],
      addMemo: (val) =>
        set((prev) => ({
          memoList: [
            ...prev.memoList,
            {
              content: val,
              date: new Date().toDateString(),
              id: new Date().getMilliseconds(),
            },
          ],
        })),
      removeMemo: (id) =>
        set((prev) => ({ memoList: prev.memoList.filter((e) => e.id !== id) })),
    }),
    {
      name: "memo-list", // required, state를 저장하는 키, unique 해야 함
      storage: createJSONStorage(() => localStorage),
    }
  )
);
