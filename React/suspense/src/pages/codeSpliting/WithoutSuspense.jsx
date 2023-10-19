import React, { useState } from "react";

export default function WithoutSuspense() {
  const [code, setCode] = useState(null);

  const handleClick = async () => {
    const module = await import("../../components/SplitCode");
    setCode(module.default);
  };

  return (
    <>
      <h3>코드 스플리팅 테스트</h3>
      {code}
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
}
