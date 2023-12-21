import {useState, useEffect} from "react";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = {"💜": 0, "💛": 0};
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("💜");
  const [scores, setScores] = useState(INITIAL_SCORES);
  console.log(scores);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }

    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    alert(`Congrats player ${currentPlayer}! You are the winner!`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = {...scores};
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  };

  const handleDraw = () => {
    alert("The game ended in a draw");

    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "💜" ? "💛" : "💜");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCellClick = (e: any) => {
    const cellIndex = Number(e.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  const resetScores = () => {
    setScores(INITIAL_SCORES);
    localStorage.setItem("scores", JSON.stringify(INITIAL_SCORES));
  };

  return (
    <div className="h-screen p-6 sm:p-12 md:p-24 bg-gradient-to-r from-gray-900 to-black flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 md:mb-7 font-display text-white">
        Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-2 md:gap-3 mx-auto w-72 md:w-96">
          {gameState.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{index, player}}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mx-auto w-72 md:w-96 text-2xl md:text-3xl">
          <p className="text-white mt-8">
            Next Player is <span>{currentPlayer}</span>
          </p>
          <p className="text-white mt-5">
            Player 💜 won: <span>{scores["💜"]}</span>
          </p>
          <p className="text-white mt-2">
            Player 💛 won: <span>{scores["💛"]}</span>
          </p>

          <button
            className="bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-5 rounded mt-7 text-2xl"
            onClick={resetScores}
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
