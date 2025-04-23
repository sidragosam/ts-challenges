import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-xs w-full border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
          Counter
        </h1>
        <div className="flex items-center space-x-6 mb-6">
          <button
            className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            onClick={() => setCount(count - 1)}
            aria-label="Decrement"
          >
            –
          </button>
          <span className="text-3xl font-mono text-gray-700 select-none min-w-[2ch] text-center">
            {count}
          </span>
          <button
            className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            onClick={() => setCount(count + 1)}
            aria-label="Increment"
          >
            +
          </button>
        </div>
        <button
          className="mt-2 text-xs text-gray-400 hover:text-blue-500 transition cursor-pointer"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
