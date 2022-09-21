<script lang="ts">
  import Tile from "./Tile.svelte";
  import CheckerWhite from "./CheckerWhite.svelte";
  import CheckerRed from "./CheckerRed.svelte";

  // 0 == blank
  // 1 == white
  // 2 == red
  let board: number[][] = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];
  // console.log(board);

  const getTileColor = (x: number, y: number): string => {
    if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0))
      return "bg-green-100";
    else return "bg-green-300";
  };

</script>

<div class="flex justify-center content-center">
  <div class="h-screen w-[100vh] p-2">
    {#each board as row, x}
      <div class="grid grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
        {#each row as col, y}
          <Tile tileColor={getTileColor(x, y)}>
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