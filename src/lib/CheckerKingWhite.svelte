<script lang="ts">
  import { CHECKER_KING_WHITE } from "../constants";
  import Checker from "./Checker.svelte";
  import crown from "../assets/crown.jpeg";

  // props
  export let isDraggable: boolean;
  export let x: number;
  export let y: number;
</script>

<Checker type={CHECKER_KING_WHITE} {isDraggable} {x} {y}>
  <div class="flex justify-center items-center h-full">
    <img src={crown} alt="crown" class="h-[50%] w-[50%]" />
  </div>
</Checker>
