<script lang="ts">
  import { CHECKER_WHITE, CHECKER_RED } from "../assets/constants";
  
  export let type: number;

  const checkerColor: string = type === CHECKER_WHITE ? "bg-white" : "bg-red-600";

  const onClick = (type: number) => (e: Event) => {
    console.log(type);
    console.log(e);
  };
</script>

<div
  on:click={onClick(type)}
  class="{checkerColor} w-full h-full rounded-full cursor-pointer "
/>
