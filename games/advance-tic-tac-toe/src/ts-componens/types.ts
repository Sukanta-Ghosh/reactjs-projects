export interface TicTacToeProps {
  boardSize?: number;
}

export type Board = (string | null)[];

export type UseTicTacToeReturn = {
  board: Board;
  handleClick: (index: number) => void;
  calculateWinner: (currentBoard: Board) => string | null;
  getStatusMessage: () => string;
  resetGame: () => void;
};
