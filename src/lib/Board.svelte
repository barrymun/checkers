<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "../stores";
  import Tile from "./Tile.svelte";
  import CheckerWhite from "./CheckerWhite.svelte";
  import CheckerRed from "./CheckerRed.svelte";
  import { DEFAULT_BOARD } from "../assets/constants";

  let board: number[][] = [];
  const unsubPlayer1 = IS_PLAYER_1.subscribe((value) => {
    board = DEFAULT_BOARD.slice().reverse();
  });
  const unsubPlayer2 = IS_PLAYER_2.subscribe((value) => {
    board = DEFAULT_BOARD;
  });
  onDestroy(unsubPlayer1);
  onDestroy(unsubPlayer2);
</script>

<div class="flex justify-center content-center">
  <div class="h-screen w-[100vh] p-2">
    {#each board as row, x}
      <div class="grid grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
        {#each row as col, y}
          <Tile {x} {y}>
            {#if col == 1}
              <CheckerWhite />
            {:else if col == 2}
              <CheckerRed />
            {/if}
          </Tile>
        {/each}
      </div>
    {/each}
  </div>
</div>
