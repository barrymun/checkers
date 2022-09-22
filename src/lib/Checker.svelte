<script lang="ts">
  import {
    CHECKER_WHITE,
    CHECKER_RED,
    CHECKER_KING_WHITE,
    CHECKER_KING_RED,
    COORDS_KEY_X,
    COORDS_KEY_Y,
    PLAYER_1_COLOR,
    PLAYER_2_COLOR,
  } from "../constants";

  // props
  export let type: number;
  export let isDraggable: boolean;
  export let x: number;
  export let y: number;

  let checkerColor: string = "";

  switch (type) {
    case CHECKER_WHITE:
      checkerColor = PLAYER_2_COLOR;
      break;
    case CHECKER_RED:
      checkerColor = PLAYER_1_COLOR;
      break;
    case CHECKER_KING_WHITE:
      checkerColor = PLAYER_2_COLOR;
      break;
    case CHECKER_KING_RED:
      checkerColor = PLAYER_1_COLOR;
      break;
    default:
      break;
  }

  const onDragStart = (e: DragEvent) => {
    if (isDraggable) {
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
  class="{checkerColor} cursor-pointer rounded-full drop-shadow-lg p-[50%]"
  on:dragstart={onDragStart}
>
  <slot />
</div>
