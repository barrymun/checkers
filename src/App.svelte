<script lang="ts">
  import { onMount } from "svelte";
  import { PLAYER_1, PLAYER_2, WEBSOCKET_URI_DEV } from "./constants";
  import { IS_PLAYER_1, IS_PLAYER_2 } from "./stores";
  import Board from "./lib/Board.svelte";

  let socket : WebSocket;

  function setRoom() {
    // get the room
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("roomId");
    console.log(roomId);
    
    // TODO
    // establish the websocket connection to the server
  }

  function assignPlayer(): number {
    // only 2 players
    return Math.floor(Math.random() * 2) + 1;
  }

  onMount(async () => {
    setRoom();

    // let player = assignPlayer();
    // if (player === PLAYER_1) IS_PLAYER_1.update((n) => true);
    // else if (player === PLAYER_2) IS_PLAYER_2.update((n) => true);
    IS_PLAYER_1.update((n) => true);
    IS_PLAYER_2.update((n) => false);
  });
</script>

<main>
  <button on:click={() => socket.send('TEST')}>
    MSG
  </button>
  <Board />
</main>
