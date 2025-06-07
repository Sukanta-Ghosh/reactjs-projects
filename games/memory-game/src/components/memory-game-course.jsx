import { useState, useEffect } from "react";
import "./memory-game-course.css";

const MemoryGameCourse = () => {
  const [gridSize, setGridSize] = useState(4);
  const [maxMoves, setMaxMoves] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [gridSize, maxMoves]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      setGameOver(true);
    } else if (maxMoves > 0 && moves >= maxMoves) {
      setGameOver(true);
    }
  }, [solved, cards, moves, maxMoves]);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setWon(false);
    setGameOver(false);
  };

  const handleClick = (id) => {
    if (disabled || gameOver) return;
    if (flipped.length === 0) {
      setFlipped([id]);
      setMoves(moves + 1);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        setMoves(moves + 1);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  const handleMaxMovesChange = (e) => {
    const moves = parseInt(e.target.value);
    if (moves >= 0) {
      setMaxMoves(moves);
    }
  };

  return (
    <div className="mgc-container">
      <h1 className="mgc-title">Memory Game</h1>
      <div className="mgc-controls">
        <div>
          <label htmlFor="gridSize" className="mgc-label">
            Grid Size:
          </label>
          <input
            id="gridSize"
            type="number"
            min="2"
            max="10"
            value={gridSize}
            onChange={handleGridSizeChange}
            className="mgc-input"
          />
        </div>
        <div>
          <label htmlFor="maxMoves" className="mgc-label">
            Max Moves (0 for unlimited):
          </label>
          <input
            id="maxMoves"
            type="number"
            min="0"
            value={maxMoves}
            onChange={handleMaxMovesChange}
            className="mgc-input"
          />
        </div>
      </div>
      <div className="mgc-moves">
        Moves: {moves}
        {maxMoves > 0 ? ` / ${maxMoves}` : ""}
      </div>
      <div
        className="mgc-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`mgc-card
              ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "mgc-card-solved"
                    : "mgc-card-flipped"
                  : "mgc-card-hidden"
              }
              ${gameOver ? "mgc-card-disabled" : ""}
            `}
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>
      {gameOver && (
        <div
          className={`mgc-result ${won ? "mgc-result-won" : "mgc-result-lost"}`}
        >
          {won ? "You Won!" : "Game Over!"}
        </div>
      )}
      <button onClick={initializeGame} className="mgc-btn">
        {gameOver ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default MemoryGameCourse;
