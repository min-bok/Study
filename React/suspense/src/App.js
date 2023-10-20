import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WithoutSuspense from "./pages/loading/WithoutSuspense";
const UseSuspense = lazy(() => import("./pages/loading/UseSuspense"));

function App() {
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const result = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(10);
  }, []);

  const handleDisplay = async () => {
    setDisplay(!display);
  };

  return (
    <>
      <WithoutSuspense />
      {/* {display ? null : (
        <Suspense fallback={<h2>Loading...</h2>}>
          <UseSuspense data={data} />
        </Suspense>
      )}
      <button onClick={handleDisplay}>사용자 정보 불러오기</button> */}
    </>
  );
}

export default App;
