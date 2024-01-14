import React, { useState, useRef } from "react";
import { useMemoStore } from "../store/MemoStore";

export default function MemoInput() {
  const [value, setValue] = useState("");
  const { addMemo } = useMemoStore();
  const inputRef = useRef();

  const addNewMemo = (e) => {
    e.preventDefault();
    addMemo(value);
    setValue("");
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          addNewMemo(e);
        }}
        className="flex justify-end"
      >
        <div className="w-96 flex justify-between gap-4">
          <input
            type="text"
            placeholder="한 줄 일기를 입력해주세요 :)"
            className="input input-bordered w-full"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="btn btn-active btn-primary">저장</button>
        </div>
      </form>
    </>
  );
}
