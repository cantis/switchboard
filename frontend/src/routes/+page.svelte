<script lang="ts">
  import { onMount } from 'svelte';

  let status: string = 'Checking...';
  let error: string | null = null;

  onMount(async () => {
    try {
      const res = await fetch('/api/health');

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      status = data.status;
    } catch (err) {
      console.error(err);
      error = 'API unreachable';
      status = 'ERROR';
    }
  });
</script>

<h1>Switchboard</h1>

<div class="card">
  <h2>API Health</h2>

  {#if error}
    <p class="error">{error}</p>
  {:else}
    <p>Status: <strong>{status}</strong></p>
  {/if}
</div>

<style>
  .card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 300px;
  }

  .error {
    color: red;
  }
</style>
