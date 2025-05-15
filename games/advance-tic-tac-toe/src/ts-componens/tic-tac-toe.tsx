/* eslint-disable react/prop-types */

import React from "react";
import useTictacToe from "../hooks/use-tic-tac-toe";
import { TicTacToeProps } from "./types";

const TicTacToe: React.FC<TicTacToeProps> = ({ boardSize = 3 }) => {
  const {
    board,
    handleClick,
    resetGame,
    getStatusMessage,
  }: {
    board: (string | null)[];
    handleClick: (index: number) => void;
    resetGame: () => void;
    getStatusMessage: () => string;
  } = useTictacToe(boardSize);

  return (
    <div
      className="game"
      style={{ "--board-size": boardSize } as React.CSSProperties}
    >
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
            disabled={cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
