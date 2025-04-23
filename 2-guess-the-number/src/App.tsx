import { useState } from "react";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [setup, setSetup] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [target, setTarget] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const startGame = () => {
    setTarget(getRandomNumber(min, max));
    setGuess("");
    setMessage("");
    setAttempts(0);
    setSetup(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    const num = Number(guess);
    if (!num || num < min || num > max) {
      setMessage(`Please enter a number between ${min} and ${max}.`);
      return;
    }
    setAttempts(attempts + 1);
    if (num === target) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries.`);
    } else if (num < target) {
      setMessage("🔼 Higher!");
    } else {
      setMessage("🔽 Lower!");
    }
  };

  const handleReset = () => {
    setSetup(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full border border-gray-200 backdrop-blur-md">
        <h1 className="text-4xl font-black mb-8 text-indigo-700 tracking-tight drop-shadow-sm">
          Guess the Number
        </h1>
        <div className="w-full">
          {setup ? (
            <section aria-label="Setup Area" className="w-full">
              <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
                <span role="img" aria-label="settings">
                  ⚙️
                </span>{" "}
                Setup
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (min >= max) {
                    alert("Minimum must be less than maximum.");
                    return;
                  }
                  startGame();
                }}
                className="w-full flex flex-col items-center gap-4"
              >
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col flex-1">
                    <label
                      className="text-sm font-semibold text-gray-600 mb-1"
                      htmlFor="min"
                    >
                      Minimum
                    </label>
                    <input
                      id="min"
                      type="number"
                      min={0}
                      max={max - 1}
                      value={min}
                      onChange={(e) => setMin(Number(e.target.value))}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                      required
                      aria-label="Minimum value"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label
                      className="text-sm font-semibold text-gray-600 mb-1"
                      htmlFor="max"
                    >
                      Maximum
                    </label>
                    <input
                      id="max"
                      type="number"
                      min={min + 1}
                      value={max}
                      onChange={(e) => setMax(Number(e.target.value))}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                      required
                      aria-label="Maximum value"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-3 bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg cursor-pointer"
                  aria-label="Start Game"
                >
                  Start Game
                </button>
              </form>
            </section>
          ) : (
            <section aria-label="Game Area" className="w-full">
              <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
                <span role="img" aria-label="game">
                  🎮
                </span>{" "}
                Game
              </h2>
              <div className="mb-4 w-full flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center text-sm text-gray-500">
                  <span>
                    <span className="font-semibold">Range:</span> {min} - {max}
                  </span>
                  {guess && (
                    <span>
                      <span className="font-semibold">Last Guess:</span> {guess}
                    </span>
                  )}
                </div>
                <hr className="border-gray-200 my-2" />
              </div>
              <form
                onSubmit={handleGuess}
                className="w-full flex flex-col items-center"
                aria-label="Guess Form"
              >
                <label htmlFor="guess-input" className="sr-only">
                  Enter your guess
                </label>
                <input
                  id="guess-input"
                  type="number"
                  min={min}
                  max={max}
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="mb-4 px-4 py-3 border border-gray-300 rounded-xl text-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  placeholder={`Enter your guess (${min}-${max})`}
                  disabled={message.startsWith("🎉")}
                  autoFocus
                  aria-label={`Enter your guess between ${min} and ${max}`}
                />
                <button
                  type="submit"
                  className={`mb-2 w-full py-3 rounded-xl font-bold shadow-lg text-lg transition-all duration-150 focus:outline-none focus:ring-2
                    ${
                      message.startsWith("🎉")
                        ? "bg-gradient-to-tr from-gray-400 to-gray-500 text-gray-50 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-tr from-indigo-500 to-blue-500 text-white hover:scale-105 active:scale-95 cursor-pointer focus:ring-indigo-400"
                    }
                  `}
                  disabled={message.startsWith("🎉")}
                  aria-label="Submit Guess"
                >
                  Guess
                </button>
              </form>
              <div
                className="min-h-[2em] text-lg text-gray-700 mb-2 text-center font-medium flex items-center justify-center gap-2"
                aria-live="polite"
              >
                {message}
              </div>
              {message.startsWith("🎉") && (
                <button
                  className="mb-2 w-full py-2 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-xl font-bold shadow hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 text-base cursor-pointer"
                  onClick={handleReset}
                  aria-label="Play Again"
                >
                  Play Again
                </button>
              )}
              <div className="flex flex-row justify-between w-full mt-2 items-center">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span role="img" aria-label="attempts">
                    🔢
                  </span>
                  Attempts: <span className="font-semibold">{attempts}</span>
                </div>
                {!message.startsWith("🎉") && (
                  <button
                    className="text-xs text-gray-400 hover:text-indigo-500 transition cursor-pointer font-semibold"
                    onClick={handleReset}
                    aria-label="Change Range or Reset"
                  >
                    Change Range / Reset
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
      <footer className="mt-8 text-gray-400 text-xs flex flex-col items-center gap-1">
        <span>
          &copy; {new Date().getFullYear()} Guess the Number Challenge
        </span>
        <span>
          <a
            href="https://github.com/sidragosam/ts-challenges"
            className="underline hover:text-indigo-600"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our GitHub"
          >
            View on GitHub
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
