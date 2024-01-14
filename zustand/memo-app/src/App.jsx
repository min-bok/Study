import { MemoInput, MemoList } from "./components";

export default function App() {
  return (
    <div className="md:container md:mx-auto h-screen py-20 px-12 flex flex-col justify-between">
      <p className="text-2xl font-bold text-center">한 줄 일기 ☺️</p>
      <MemoList />
      <MemoInput />
    </div>
  );
}
