<script lang="ts">
  import { onMount } from "svelte";
  import { PLAYER_1, PLAYER_2 } from "./assets/constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "./stores";
  import Board from "./lib/Board.svelte";

  // let isPlayer1: boolean = false;
  // let isPlayer2: boolean = false;
  // IS_PLAYER_1.subscribe(value => {
  // 	isPlayer1 = value;
  // });
  // IS_PLAYER_2.subscribe(value => {
  // 	isPlayer2 = value;
  // });

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
