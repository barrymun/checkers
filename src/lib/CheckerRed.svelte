<script lang="ts">
  import { CHECKER_RED } from "../constants";
  import Checker from "./Checker.svelte";

  // props
  export let isDraggable: boolean;
  export let x: number;
  export let y: number;
</script>

<Checker type={CHECKER_RED} {isDraggable} {x} {y} />
