import { useState } from "react";

const initialBoard = (size) => Array(size * size).fill(null);

const useTictacToe = (boardSize) => {
  const [board, setBoard] = useState(initialBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  /* Generate winning patterns */
  const generateWinningPatterns = () => {
    const patterns = [];

    // Generate horizental and vertical patterns
    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j); // in horizental i represents row, j represents column
        verticalPattern.push(j * boardSize + i); // in vertical j represents row, i represents column
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    // Generate diagonal winning pattern
    const diagonal1 = [];
    const diagonal2 = [];
    // here i represents rows
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1)); // top left to down right
      diagonal2.push((i + 1) * (boardSize - 1)); // top right to down left
    }
    patterns.push(diagonal1, diagonal2);

    return patterns;
  };

  const WINNING_PATTERNS = generateWinningPatterns();

  // Calculate Winner handler
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];

      let countX = 0;
      let countO = 0;

      for (let j = 0; j < pattern.length; j++) {
        const cell = currentBoard[pattern[j]];
        if (cell === "X") {
          countX++;
        } else if (cell === "O") {
          countO++;
        }
      }
      if (countX === boardSize) return "X";
      if (countO === boardSize) return "O";
    }

    return null;
  };

  // handler function after clicking box
  const handleClick = (index) => {
    // check winner
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Hnadler function to get status message
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  // Handler function to reset the game
  const resetGame = () => {
    setBoard(initialBoard(boardSize));
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTictacToe;
