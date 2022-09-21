<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1 } from "../stores";
  import { CHECKER_WHITE } from "../assets/constants";
  import Checker from "./Checker.svelte";

  // subs
  let isPlayer1: boolean = false;
  const unsubPlayer1 = IS_PLAYER_1.subscribe(value => isPlayer1 = value);
  onDestroy(unsubPlayer1);
</script>

<Checker type={CHECKER_WHITE} isDraggable={isPlayer1} />
