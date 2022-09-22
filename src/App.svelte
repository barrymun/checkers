<script lang="ts">
  import { onMount } from "svelte";
  import { IS_PLAYER_1, IS_PLAYER_2, THE_BOARD } from "./stores";
  import { BOARD_PLAYER_1 } from "./constants";
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
    IS_PLAYER_1.set(true);
    IS_PLAYER_2.set(false);
    THE_BOARD.set(BOARD_PLAYER_1);
  }

  onMount(async () => {
    setRoom();
    setPlayer();
  });
</script>

<main>
  <Board />
</main>
