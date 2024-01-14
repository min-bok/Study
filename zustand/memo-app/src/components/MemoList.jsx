import React from "react";
import { Memo } from "../components";
import { useMemoStore } from "../store/MemoStore";

export default function MemoList() {
  const { memoList } = useMemoStore();

  return (
    <>
      {!!memoList.length ? (
        <div className="grid grid-cols-4 gap-4 overflow-y-auto h-4/6 scrollbar-hide min-h-96">
          {memoList &&
            memoList.map((el) => (
              <Memo key={el.id} id={el.id} date={el.date}>
                {el.content}
              </Memo>
            ))}
        </div>
      ) : (
        <p>메모 없음</p>
      )}
    </>
  );
}
