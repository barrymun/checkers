<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "../stores";
  import Tile from "./Tile.svelte";
  import CheckerWhite from "./CheckerWhite.svelte";
  import CheckerRed from "./CheckerRed.svelte";
  import {
    BOARD_PLAYER_1,
    BOARD_PLAYER_2,
    BLANK_TILE,
    COORDS_KEY_X,
    COORDS_KEY_Y,
  } from "../constants";

  // subs
  let board: number[][] = [];
  const unsubPlayer1 = IS_PLAYER_1.subscribe((value) => {
    console.log('HERE1')
    if (value) board = BOARD_PLAYER_1;
  });
  const unsubPlayer2 = IS_PLAYER_2.subscribe((value) => {
    console.log('HERE2')
    if (value) board = BOARD_PLAYER_2;
  });
  onDestroy(unsubPlayer1);
  onDestroy(unsubPlayer2);

  //
  const onDrop = (x: number, y: number) => (e: DragEvent) => {
    e.preventDefault();
    let fromX = parseInt(e.dataTransfer.getData(COORDS_KEY_X));
    let fromY = parseInt(e.dataTransfer.getData(COORDS_KEY_Y));
    console.log(fromX, fromY);
    console.log(x, y);

    // do nothing, player has not moved
    // TODO: consider whether this should be considered touching a piece?
    // if (fromX === x && fromY === y) return;

    // standard move
    let standardX = fromX === x + 1;
    let standardY = fromY === y - 1 || fromY === y + 1;
    let standardClear = board[x][y] === BLANK_TILE;

    // TODO:
    // capture move (+ all valid moves in a single movement)

    // TODO:
    // king move

    if (standardX && standardY && standardClear) {
      let temp = board[fromX][fromY];
      board[fromX][fromY] = board[x][y];
      board[x][y] = temp;
    } else {
      return;
    }
    console.log(board);
  };
</script>

<div class="flex justify-center content-center">
  <div class="h-screen w-[100vh] p-2">
    {#each board as row, x}
      <div class="grid grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
        {#each row as col, y}
          <Tile onDrop={onDrop(x, y)} {x} {y}>
            {#if col == 1}
              <CheckerWhite {x} {y} />
            {:else if col == 2}
              <CheckerRed {x} {y} />
            {/if}
          </Tile>
        {/each}
      </div>
    {/each}
  </div>
</div>
