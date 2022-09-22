export const REPO_URI: string = "https://github.com/barrymun/checkers";
export const URI_TARGET: string = "_blank";
export const URI_REL: string = "noopener noreferrer";
export const BLANK_TILE: number = 0;
export const CHECKER_WHITE: number = 1;
export const CHECKER_RED: number = 2;
export const CHECKER_KING_WHITE: number = 3;
export const CHECKER_KING_RED: number = 4;
export const PLAYER_1: number = 1;
export const PLAYER_2: number = 2;
export const PLAYER_1_COLOR: string = "bg-red-600";
export const PLAYER_2_COLOR: string = "bg-slate-100";
export const BOARD_PLAYER_1: number[][] = [
  [BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE],
  [CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE],
  [BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE],
  [BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE],
  [BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE],
  [CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE],
  [BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED],
  [CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE],
];
// test board
// export const BOARD_PLAYER_1: number[][] = [
//   [BLANK_TILE, BLANK_TILE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_KING_RED, BLANK_TILE, BLANK_TILE],
//   [BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE],
//   [BLANK_TILE, CHECKER_WHITE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE],
//   [BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, CHECKER_WHITE, BLANK_TILE, BLANK_TILE, BLANK_TILE],
//   [BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE, BLANK_TILE],
//   [BLANK_TILE, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE],
//   [BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED],
//   [CHECKER_RED, BLANK_TILE, CHECKER_KING_WHITE, BLANK_TILE, CHECKER_RED, BLANK_TILE, CHECKER_RED, BLANK_TILE],
// ];
export const BOARD_PLAYER_2: number[][] = BOARD_PLAYER_1.slice(0).reverse().map(row => row.slice(0).reverse());
export const COORDS_KEY_X: string = "X_POS";
export const COORDS_KEY_Y: string = "Y_POS";
export const WEBSOCKET_URI_DEV: string = "ws://127.0.0.1:5173";