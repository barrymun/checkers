<script lang="ts">
  import { onDestroy } from "svelte";
  import { CHECKER_WHITE, CHECKER_RED } from "../assets/constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "../stores";

  // props
  export let type: number;
  export let isDraggable: boolean;

  const checkerColor: string =
    type === CHECKER_WHITE ? "bg-white" : "bg-red-600";

  const onDragStart = (e: DragEvent) => {
    console.log("onDragStart", e);
  };
</script>

<div
  draggable={isDraggable}
  class="{checkerColor} cursor-pointer w-full h-full rounded-full"
  on:dragstart={onDragStart}
/>
