<script lang="ts">
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
  console.log(board);
</script>

<div class="h-screen">
  {#each board as row, x}
    <div class="grid gap-4 grid-cols-8 grid-rows-8 h-[calc(100%/8)]">
      {#each row as col, y}
        {#if (x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)}
          <div class="bg-green-100">
            {col}
          </div>
        {:else}
          <div class="bg-green-300">
            {col}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
