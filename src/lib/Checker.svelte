<script lang="ts">
  import { onDestroy } from "svelte";
  import { CHECKER_WHITE, CHECKER_RED, COORDS_KEY_X, COORDS_KEY_Y } from "../assets/constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "../stores";

  // props
  export let type: number;
  export let isDraggable: boolean;
  export let x: number;
  export let y: number;

  const checkerColor: string =
    type === CHECKER_WHITE ? "bg-white" : "bg-red-600";

  const onDragStart = (e: DragEvent) => {
    if (isDraggable) {
      // console.log("onDragStart", e);
      e.dataTransfer.setData(COORDS_KEY_X, x.toString());
      e.dataTransfer.setData(COORDS_KEY_Y, y.toString());
    } else {
      // for use with draggable=false
      e.preventDefault();
    }
  };
</script>

<div
  draggable={isDraggable}
  class="{checkerColor} cursor-pointer w-full h-full rounded-full"
  on:dragstart={onDragStart}
/>
