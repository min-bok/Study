import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

export default function UseSuspense({ data }) {
  const [user, setUser] = useState(null);
  const [display, setDisplay] = useState(true);

  const fetData = async (id) => {
    setDisplay(false);
  };

  useEffect(() => {
    getData(data);
  }, []);

  const getData = async ({ data }) => {
    const result = await data;
    console.log(result, "result");
  };

  return (
    <>
      {/* {display ? null : (
        <Suspense fallback={<h2>Loading...</h2>}>
          <div>
            <h2>{user?.name}'s Information</h2>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <p>Website: {user?.website}</p>
          </div>
        </Suspense>
      )}
      <button
        onClick={() => {
          fetData(id);
        }}
      >
        사용자 정보 불러오기
      </button> */}
    </>
  );
}
