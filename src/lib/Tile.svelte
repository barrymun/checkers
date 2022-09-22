<script lang="ts">
  export let x: number;
  export let y: number;
  export let onDrop: Function;

  const tileColor: string =
    (x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)
      ? "bg-green-100"
      : "bg-green-300";

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
</script>

<div class={tileColor} on:dragover={onDragOver} on:drop={onDrop(x ,y)}>
  <slot />
</div>
