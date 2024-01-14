import React from "react";
import { useMemoStore } from "../store/MemoStore";

export default function Memo({ id, children }) {
  const { removeMemo } = useMemoStore();

  const deleteMemo = (id) => {
    removeMemo(id);
  };

  return (
    <div className="card bg-base-100 shadow-xl h-48">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => deleteMemo(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p>{children}</p>
        {/* <p>{date}</p> */}
      </div>
    </div>
  );
}
