import { useState, useEffect } from "react";
import "./memory-game.css";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // what cards flipped
  const [solved, setSolved] = useState([]); // what cards solved
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  // initialize or reset the game
  const initializeGame = () => {
    // total no of cards
    const totalCards = gridSize * gridSize;
    // how many pairs will be there
    const pairCount = Math.floor(totalCards / 2);
    // Get number from 1 - n
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    // Creating pair of siffle cards
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  const handleClick = (id) => {
    if (disabled || won) return;
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      // if second flipped card id is not same as first one
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        //checking if both card are match
        checkMatch(id);
      }
      // if clicked on same card then reset
      else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  //checking if both card are match
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

  // to check if any card is flipped or not
  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  // check if flipped card is solved or not
  const isSolved = (id) => solved.includes(id);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  return (
    <div className="memory-game-container">
      <h1 className="memory-game-title">Memory Game</h1>

      {/* Grid size input */}
      <div className="memory-game-grid-size">
        <label htmlFor="gridSize" className="memory-game-label">
          Grid Size: (max 10)
        </label>
        <input
          id="gridSize"
          type="number"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="memory-game-input"
        />
      </div>

      {/* Game */}
      <div
        className="memory-game-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={
              "memory-game-card " +
              (isFlipped(card.id)
                ? isSolved(card.id)
                  ? "memory-game-card-solved"
                  : "memory-game-card-flipped"
                : "memory-game-card-unflipped")
            }
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {/* Result */}
      {won && <div className="memory-game-won">You Won!</div>}

      {/* Play Again / Reset */}
      <button onClick={initializeGame} className="memory-game-btn">
        {won ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default MemoryGame;
