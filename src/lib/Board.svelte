<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "../stores";
  import Tile from "./Tile.svelte";
  import CheckerWhite from "./CheckerWhite.svelte";
  import CheckerRed from "./CheckerRed.svelte";
  import CheckerKingWhite from "./CheckerKingWhite.svelte";
  import CheckerKingRed from "./CheckerKingRed.svelte";
  import {
    BOARD_PLAYER_1,
    BOARD_PLAYER_2,
    BLANK_TILE,
    CHECKER_RED,
    CHECKER_WHITE,
    CHECKER_KING_RED,
    CHECKER_KING_WHITE,
    COORDS_KEY_X,
    COORDS_KEY_Y,
  } from "../constants";

  // subs
  let isPlayer1: boolean = false;
  let isPlayer2: boolean = false;
  let board: number[][] = [];
  const unsubPlayer1 = IS_PLAYER_1.subscribe((value) => {
    if (value) {
      isPlayer1 = true;
      board = BOARD_PLAYER_1;
    }
  });
  const unsubPlayer2 = IS_PLAYER_2.subscribe((value) => {
    if (value) {
      isPlayer2 = true;
      board = BOARD_PLAYER_2;
    }
  });
  onDestroy(unsubPlayer1);
  onDestroy(unsubPlayer2);

  //
  const getMoveset = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
  ] => {
    // standard move
    let standardMoveX = fromX === toX + 1;
    let standardMoveY = fromY === toY - 1 || fromY === toY + 1;

    // standard jump
    let standardJumpX = fromX === toX + 2;
    let standardJumpY = fromY === toY - 2 || fromY === toY + 2;

    // king move
    let kingMoveX = fromX === toX - 1 || fromX === toX + 1;
    let kingMoveY = fromY === toY - 1 || fromY === toY + 1;

    // king jump
    let kingJumpX = fromX === toX - 2 || fromX === toX + 2;
    let kingJumpY = fromY === toY - 2 || fromY === toY + 2;

    return [
      standardMoveX,
      standardMoveY,
      standardJumpX,
      standardJumpY,
      kingMoveX,
      kingMoveY,
      kingJumpX,
      kingJumpY,
    ];
  };

  const onDrop = (x: number, y: number) => (e: DragEvent) => {
    e.preventDefault();

    let fromX = parseInt(e.dataTransfer.getData(COORDS_KEY_X));
    let fromY = parseInt(e.dataTransfer.getData(COORDS_KEY_Y));

    // do nothing, player has not moved
    // TODO: consider whether this should be considered touching a piece?
    // if (fromX === x && fromY === y) return;

    let canMove: boolean = true;
    let canJump: boolean = true;

    while (canJump) {
      let piece = board[fromX][fromY];
      let spaceClear = board[x][y] === BLANK_TILE;
      let isKing = piece === CHECKER_KING_RED || piece === CHECKER_KING_WHITE;

      // crown king (special case)
      let checkCanMakeKing = x === 0;
      if (checkCanMakeKing && spaceClear && !isKing) {
        board[fromX][fromY] = board[x][y];
        if (isPlayer1) board[x][y] = CHECKER_KING_RED;
        else if (isPlayer2) board[x][y] = CHECKER_KING_WHITE;
        canMove = false;
        canJump = false;
        break; // player's turn is now over
      }

      let [
        standardMoveX,
        standardMoveY,
        standardJumpX,
        standardJumpY,
        kingMoveX,
        kingMoveY,
        kingJumpX,
        kingJumpY,
      ] = getMoveset(fromX, fromY, x, y);

      if (
        (!isKing && spaceClear && standardJumpX && standardJumpY) ||
        (isKing && spaceClear && kingJumpX && kingJumpY)
      ) {
        canMove = true;
        canJump = true;
      } else if (
        (!isKing && spaceClear && standardMoveX && standardMoveY) ||
        (isKing && spaceClear && kingMoveX && kingMoveY)
      ) {
        canMove = true;
        canJump = false;
      } else {
        canMove = false;
        canJump = false;
        break;
      }

      if (canMove) {
        board[fromX][fromY] = board[x][y];
        board[x][y] = piece;

        if (canJump) {
          board[(fromX + x) / 2][(fromY + y) / 2] = BLANK_TILE;
        }
      }

      // "to" position becomes the "from" position
      fromX = x;
      fromY = y;
      //
      [
        standardMoveX,
        standardMoveY,
        standardJumpX,
        standardJumpY,
        kingMoveX,
        kingMoveY,
        kingJumpX,
        kingJumpY,
      ] = getMoveset(fromX, fromY, x, y);
      if (isKing) {
      } else {
      }
    }

    // console.log(board);
  };
</script>

<div class="flex justify-center content-center">
  <div class="h-screen w-[100vh] p-2">
    {#each board as row, x}
      <div class="grid grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
        {#each row as col, y}
          <Tile onDrop={onDrop(x, y)} {x} {y}>
            {#if col === CHECKER_WHITE}
              <CheckerWhite isDraggable={isPlayer2} {x} {y} />
            {:else if col === CHECKER_RED}
              <CheckerRed isDraggable={isPlayer1} {x} {y} />
            {:else if col === CHECKER_KING_WHITE}
              <CheckerKingWhite isDraggable={isPlayer2} {x} {y} />
            {:else if col === CHECKER_KING_RED}
              <CheckerKingRed isDraggable={isPlayer1} {x} {y} />
            {/if}
          </Tile>
        {/each}
      </div>
    {/each}
  </div>
</div>
