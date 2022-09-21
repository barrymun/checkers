<script lang="ts">
  import { CHECKER_WHITE, CHECKER_RED } from "../assets/constants";

  export let type: number;

  const checkerColor: string =
    type === CHECKER_WHITE ? "bg-white" : "bg-red-600";

  const onDragStart = (e: DragEvent) => {
    console.log("onDragStart", e);
  };
</script>

<div
  draggable={true}
  class="{checkerColor} cursor-pointer w-full h-full rounded-full"
  on:dragstart={onDragStart}
/>
