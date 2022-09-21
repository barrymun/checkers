<script lang="ts">
  import { COORDS_KEY_X, COORDS_KEY_Y } from "../assets/constants";

  export let x: number;
  export let y: number;

  const tileColor: string =
    (x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)
      ? "bg-green-300"
      : "bg-green-100";

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    // console.log("onDragOver", e);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    let fromX = parseInt(e.dataTransfer.getData(COORDS_KEY_X));
    let fromY = parseInt(e.dataTransfer.getData(COORDS_KEY_Y));
    console.log(fromX, fromY);
    console.log(x, y);
  };
</script>

<div class={tileColor} on:dragover={onDragOver} on:drop={onDrop}>
  <slot />
</div>
