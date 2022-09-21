<script lang="ts">
  import { onMount } from "svelte";
  import { PLAYER_1, PLAYER_2 } from "./constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "./stores";
  import Board from "./lib/Board.svelte";

  function assignPlayer(): number {
    // only 2 players
    return Math.floor(Math.random() * 2) + 1;
  }

  onMount(async () => {
    let player = assignPlayer();
    if (player === PLAYER_1) IS_PLAYER_1.update((n) => true);
    else if (player === PLAYER_2) IS_PLAYER_2.update((n) => true);
  });
</script>

<main>
  <Board />
</main>
