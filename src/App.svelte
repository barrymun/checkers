<script lang="ts">
  import { onMount } from "svelte";
  import { PLAYER_1, PLAYER_2, WEBSOCKET_URI_DEV } from "./constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "./stores";
  import Board from "./lib/Board.svelte";

  let socket: WebSocket;

  function setRoom() {
    // get the room
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("roomId");

    // TODO
    // establish the websocket connection to the server
  }

  function setPlayer() {
    // TODO: decide who the player is based on the order they appear in the room
    IS_PLAYER_1.update((n) => true);
    IS_PLAYER_2.update((n) => false);
  }

  onMount(async () => {
    setRoom();
    setPlayer();
  });
</script>

<main>
  <Board />
</main>
