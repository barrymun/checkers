<script lang="ts">
  import { onDestroy } from "svelte";
  import { IS_PLAYER_2 } from "../stores";
  import { CHECKER_RED } from "../assets/constants";
  import Checker from "./Checker.svelte";

  // props
  export let x: number;
  export let y: number;

  // subs
  let isPlayer2: boolean = false;
  const unsubPlayer2 = IS_PLAYER_2.subscribe(value => isPlayer2 = value);
  onDestroy(unsubPlayer2);
</script>

<Checker type={CHECKER_RED} isDraggable={isPlayer2} {x} {y} />
