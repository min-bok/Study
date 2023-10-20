import React from "react";

export default function UseSuspense({ data }) {
  return (
    <div>
      <h2>{data.name}'s Information</h2>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>
    </div>
  );
}
