<script lang="ts">
  import { REPO_URI, URI_TARGET, URI_REL } from "../constants";
  import github from "../assets/github.png";

  const onClick = (e: Event) => {
    window.open(REPO_URI, URI_TARGET, URI_REL);
  };
</script>

<div class="fixed top-2 right-2">
  <button class="h-10 w-10" on:click={onClick}>
    <img src={github} alt="github" />
  </button>
</div>
