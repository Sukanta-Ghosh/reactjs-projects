import { useState } from "react";
import { Board, UseTicTacToeReturn } from "./types";

const initialBoard = (size: number): Board => Array(size * size).fill(null);

const useTictacToe = (boardSize: number): UseTicTacToeReturn => {
  const [board, setBoard] = useState<Board>(initialBoard(boardSize));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  /* Generate winning patterns */
  const generateWinningPatterns = (): number[][] => {
    const patterns: number[][] = [];

    // Generate horizontal and vertical patterns
    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern: number[] = [];
      const verticalPattern: number[] = [];
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j);
        verticalPattern.push(j * boardSize + i);
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    // Generate diagonal winning patterns
    const diagonal1: number[] = [];
    const diagonal2: number[] = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1));
      diagonal2.push((i + 1) * (boardSize - 1));
    }
    patterns.push(diagonal1, diagonal2);

    return patterns;
  };

  const WINNING_PATTERNS = generateWinningPatterns();
  console.log(WINNING_PATTERNS);

  // Calculate Winner handler
  const calculateWinner = (currentBoard: Board): string | null => {
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

  // Handler function after clicking box
  const handleClick = (index: number): void => {
    // Check winner
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Handler function to get status message
  const getStatusMessage = (): string => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  // Handler function to reset the game
  const resetGame = (): void => {
    setBoard(initialBoard(boardSize));
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTictacToe;
