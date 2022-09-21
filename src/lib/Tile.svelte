<script lang="ts">
  export let tileColor: string;

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    console.log("onDragOver", e);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    console.log("onDrop", e);
  };
</script>

<div class={tileColor} on:dragover={onDragOver} on:drop={onDrop}>
  <slot />
</div>
