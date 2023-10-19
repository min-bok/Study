import "./App.css";
import axios from "axios";
// import WithoutSuspense from "./pages/loading/WithoutSuspense";
import UseSuspense from "./pages/loading/UseSuspense";
import { Suspense, useEffect } from "react";

function App() {
  useEffect(() => {
    fetchData(10);
  }, []);

  const fetchData = async (id) => {
    try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return result.data;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <UseSuspense data={fetchData(10)} />
    </Suspense>
  );
}

export default App;
