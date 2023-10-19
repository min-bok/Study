import React, { Suspense, lazy, useState } from "react";
const SplitCode = lazy(() => import("../../components/SplitCode"));

export default function UseSuspense() {
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(true);
  };

  return (
    <>
      <h3>코드 스플리팅 테스트</h3>
      <Suspense fallback={<h3>Loading...</h3>}>
        {display && <SplitCode />}
      </Suspense>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
}
