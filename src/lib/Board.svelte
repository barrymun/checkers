<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1, IS_PLAYER_2, THE_BOARD } from "../stores";
  import Tile from "./Tile.svelte";
  import CheckerWhite from "./CheckerWhite.svelte";
  import CheckerRed from "./CheckerRed.svelte";
  import CheckerKingWhite from "./CheckerKingWhite.svelte";
  import CheckerKingRed from "./CheckerKingRed.svelte";
  import {
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
  let theBoard: number[][] = [];
  const unsubPlayer1 = IS_PLAYER_1.subscribe((value) => (isPlayer1 = value));
  const unsubPlayer2 = IS_PLAYER_2.subscribe((value) => (isPlayer2 = value));
  const unsubTheBoard = THE_BOARD.subscribe((value) => (theBoard = value));
  onDestroy(unsubPlayer1);
  onDestroy(unsubPlayer2);
  onDestroy(unsubTheBoard);

  //
  const opponentMatchCondition = isPlayer1 ? CHECKER_WHITE : CHECKER_WHITE;
  
  const getMoveOptions = (
    isKing: boolean,
    spaceClear: boolean,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): [boolean, boolean] => {
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

    let canMove: boolean,
      canJump: boolean = true;

    if (
      (!isKing && spaceClear && standardJumpX && standardJumpY) ||
      (isKing && spaceClear && kingJumpX && kingJumpY)
    ) {
      // check jump first
      canMove = false;
      canJump = true;
    } else if (
      (!isKing && spaceClear && standardMoveX && standardMoveY) ||
      (isKing && spaceClear && kingMoveX && kingMoveY)
    ) {
      // check move available
      canMove = true;
      canJump = false;
    } else {
      // default
      canMove = false;
      canJump = false;
    }

    return [canMove, canJump];
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
      // check wall collision
      if (
        fromX < 0 ||
        fromX > 7 ||
        fromY < 0 ||
        fromY > 7 ||
        x < 0 ||
        x > 7 ||
        y < 0 ||
        y > 7
      ) {
        canMove = false;
        canJump = false;
        break; // invalid space, player's turn over
      }

      let piece = theBoard[fromX][fromY];
      let spaceClear = theBoard[x][y] === BLANK_TILE;
      let isKing = piece === CHECKER_KING_RED || piece === CHECKER_KING_WHITE;

      [canMove, canJump] = getMoveOptions(
        isKing,
        spaceClear,
        fromX,
        fromY,
        x,
        y
      );
      console.log(canMove, canJump);

      // alter the board
      let newBoard = theBoard;
      let newFromPiece = newBoard[x][y];
      if (canMove) {
        newBoard[fromX][fromY] = newFromPiece;
        newBoard[x][y] = piece;
      } else if (canJump) {
        newBoard[fromX][fromY] = newFromPiece;
        newBoard[x][y] = piece;
        newBoard[(fromX + x) / 2][(fromY + y) / 2] = BLANK_TILE;
      }
      // crown king (special case)
      let checkCanMakeKing = x === 0 && (canMove || canJump);
      if (checkCanMakeKing && spaceClear && !isKing) {
        if (isPlayer1) newBoard[x][y] = CHECKER_KING_RED;
        else if (isPlayer2) newBoard[x][y] = CHECKER_KING_WHITE;
        // mark turn ended
        canMove = false;
        canJump = false;
      }

      // set the board
      THE_BOARD.set(newBoard);

      // moved only, cannot check for subsequent jump moves
      if (!canMove && !canJump) break;

      // subsequent moves
      // "to" position becomes the "from" position
      fromX = x;
      fromY = y;
      // check if a jump is possible
      try {
        if (
          isKing &&
          theBoard[fromX + 1][fromY + 1] === opponentMatchCondition
        ) {
          console.log("HERE1", canMove, canJump);
          x = fromX + 2;
          y = fromY + 2;
        } else if (
          isKing &&
          theBoard[fromX + 1][fromY - 1] === opponentMatchCondition
        ) {
          console.log("HERE2", canMove, canJump);
          x = fromX + 2;
          y = fromY - 2;
        } else if (theBoard[fromX - 1][fromY + 1] === opponentMatchCondition) {
          console.log("HERE3", canMove, canJump);
          x = fromX - 2;
          y = fromY + 2;
        } else if (theBoard[fromX - 1][fromY - 1] === opponentMatchCondition) {
          console.log("HERE4", canMove, canJump);
          x = fromX - 2;
          y = fromY - 2;
        } else {
          console.log("HERE5");
          canMove = false;
          canJump = false;
        }
      } catch (err) {
        console.log(err);
        canMove = false;
        canJump = false;
      }
    }

    // console.log(board);
  };
</script>

<div class="flex justify-center content-center">
  <div class="h-screen w-[100vh] p-2">
    {#each theBoard as row, x}
      <div class="grid grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
        {#each row as col, y}
          <Tile {onDrop} {x} {y}>
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
