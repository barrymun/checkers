<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_1 } from "../stores";
  import { CHECKER_RED } from "../constants";
  import Checker from "./Checker.svelte";

  // props
  export let x: number;
  export let y: number;

  // subs
  let isPlayer1: boolean = false;
  const unsubPlayer1 = IS_PLAYER_1.subscribe(value => isPlayer1 = value);
  onDestroy(unsubPlayer1);
</script>

<Checker type={CHECKER_RED} isDraggable={isPlayer1} {x} {y} />
