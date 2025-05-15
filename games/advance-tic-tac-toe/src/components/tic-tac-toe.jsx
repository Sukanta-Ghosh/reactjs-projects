/* eslint-disable react/prop-types */

import { useState } from "react";
import useTictacToe from "../hooks/use-tic-tac-toe";

function TicTacToe() {
  const [boardSize, setBoardSize] = useState(3); //TODO: Logic is not working

  const { board, handleClick, resetGame, getStatusMessage } =
    useTictacToe(boardSize);

  return (
    <div className="game" style={{ "--board-size": boardSize }}>
      <div className="status">
        {getStatusMessage()}
        <label>
          Size:
          <input
            type="number"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
            min={3}
            max={6}
          />
        </label>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="board">
        {board.map((b, index) => {
          return (
            <button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={board[index] !== null}
            >
              {board[index]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;
