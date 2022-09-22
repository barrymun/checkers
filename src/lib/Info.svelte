<script lang="ts">
  import { IS_PLAYER_1_TURN, IS_PLAYER_2_TURN } from "../stores";
  import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../constants";
</script>

<div class="overflow-hidden rounded-lg bg-white shadow">
  <div class="px-4 py-5 sm:p-6">
    {#if $IS_PLAYER_1_TURN}
      <span
        class="inline-flex items-center rounded-full {PLAYER_1_COLOR} px-3 py-0.5 text-sm font-medium text-slate-100"
      >
        Player 1
      </span>
    {:else if $IS_PLAYER_2_TURN}
      <span
        class="inline-flex items-center rounded-full {PLAYER_2_COLOR} px-3 py-0.5 text-sm font-medium text-red-600"
      >
        Player 2
      </span>
    {/if}
    can move
  </div>
</div>
