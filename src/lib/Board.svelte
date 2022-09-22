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
      canMove = true;
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
      let piece = board[fromX][fromY];
      let spaceClear = board[x][y] === BLANK_TILE;
      let isKing = piece === CHECKER_KING_RED || piece === CHECKER_KING_WHITE;

      [canMove, canJump] = getMoveOptions(
        isKing,
        spaceClear,
        fromX,
        fromY,
        x,
        y
      );

      // alter the board
      if (canMove) {
        board[fromX][fromY] = board[x][y];
        board[x][y] = piece;

        if (canJump) {
          board[(fromX + x) / 2][(fromY + y) / 2] = BLANK_TILE;
        }
      }

      // crown king (special case)
      let checkCanMakeKing = (x === 0 && canMove);
      if (checkCanMakeKing && spaceClear && !isKing) {
        if (isPlayer1) board[x][y] = CHECKER_KING_RED;
        else if (isPlayer2) board[x][y] = CHECKER_KING_WHITE;
        canMove = false;
        canJump = false;
        break; // player's turn is now over
      }

      // moved only, cannot check for subsequent jump moves
      if (canMove && !canJump) break;

      // subsequent moves
      // "to" position becomes the "from" position
      fromX = x;
      fromY = y;
      // calculate the new "to" position
      // let count: number = 0,
      //   xCount: number = 2,
      //   yCount: number = 2;
      // while (count < 4) {
        
      //   if (count == 2) {
      //     console.log("HERE");
      //     xCount -= 1;
      //     yCount -= 1;
      //   }
      //   console.log(count, xCount, yCount);

      //   [canMove, canJump] = getMoveOptions(
      //     isKing,
      //     spaceClear,
      //     fromX,
      //     fromY,
      //     x + xCount,
      //     y + yCount
      //   );
      //   console.log(canMove, canJump);
      //   if (canMove) {
      //     // we have the next moveset, set new x and y coords
      //     console.log("BEFORE", x, y);
      //     x += xCount;
      //     y += yCount;
      //     console.log("AFTER", x, y);
      //     break; 
      //   }
      //   // next
      //   xCount *= -1;
      //   yCount *= -1;
      //   count += 1;
      // }
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
