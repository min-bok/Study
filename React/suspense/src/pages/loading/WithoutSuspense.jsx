import React, { useState } from "react";
import axios from "axios";

export default function WithoutSuspense({ id = 1 }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(true);

  const fetData = async (id) => {
    setDisplay(false);
    try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(result.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {display ? null : (
        <>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <div>
                <h2>{user.name}'s Information</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
              </div>
            </>
          )}
        </>
      )}
      <button
        onClick={() => {
          fetData(id);
        }}
      >
        사용자 정보 불러오기
      </button>
    </>
  );
}
