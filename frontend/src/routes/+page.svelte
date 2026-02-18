<script lang="ts">
  import { onMount } from 'svelte';
  import { APPS, type AppLink } from '$lib/apps';

  let apiStatus: string = 'Checking...';
  let apiOk = false;

  // Simple client-side search/filter
  let q = '';
  $: filtered = APPS.filter((a) => {
    const haystack = `${a.name} ${a.description ?? ''} ${(a.tags ?? []).join(' ')}`.toLowerCase();
    return haystack.includes(q.trim().toLowerCase());
  });

  async function checkHealth(): Promise<void> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      apiStatus = data.status ?? 'unknown';
      apiOk = apiStatus === 'ok';
    } catch {
      apiStatus = 'unreachable';
      apiOk = false;
    }
  }

  onMount(async () => {
    await checkHealth();
  });

  function openApp(app: AppLink): void {
    window.open(app.href, '_blank', 'noopener,noreferrer');
  }
</script>

<header class="header">
  <div>
    <h1>Switchboard</h1>
    <p class="sub">Local app launcher</p>
  </div>

  <div class="health">
    <span class="dot" data-ok={apiOk}></span>
    <span class="label">API: <strong>{apiStatus}</strong></span>
    <button class="btn" on:click={checkHealth}>Refresh</button>
  </div>
</header>

<section class="toolbar">
  <input
    class="search"
    placeholder="Search apps…"
    bind:value={q}
    aria-label="Search apps"
  />
  <div class="count">{filtered.length} shown</div>
</section>

<section class="grid" aria-label="Applications grid">
  {#each filtered as app (app.name)}
    <article class="card">
      <div class="card-head">
        <h2 title={app.name}>{app.name}</h2>
        <div class="tags">
          {#each app.tags ?? [] as t (t)}
            <span class="tag">{t}</span>
          {/each}
        </div>
      </div>

      {#if app.description}
        <p class="desc">{app.description}</p>
      {:else}
        <p class="desc muted">No description</p>
      {/if}

      <div class="actions">
        <a class="link" href={app.href} target="_blank" rel="noopener noreferrer">Open</a>
        <button class="btn" on:click={() => openApp(app)}>New tab</button>
      </div>

      <p class="href" title={app.href}>{app.href}</p>
    </article>
  {/each}
</section>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    margin: 1.5rem 0 1rem 0;
  }

  h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  .sub {
    margin: 0.25rem 0 0 0;
    color: #666;
  }

  .health {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0.5rem 0.75rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #c00;
    display: inline-block;
  }
  .dot[data-ok='true'] {
    background: #0a0;
  }

  .label {
    white-space: nowrap;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 0 0 1rem 0;
  }

  .search {
    width: min(520px, 100%);
    padding: 0.6rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 1rem;
  }

  .count {
    color: #666;
  }

  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    margin-bottom: 2rem;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 14px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: start;
  }

  h2 {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .tags {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: end;
  }

  .tag {
    font-size: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 999px;
    padding: 0.1rem 0.45rem;
    color: #444;
  }

  .desc {
    margin: 0;
    color: #333;
  }

  .muted {
    color: #777;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .link {
    text-decoration: none;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 0.45rem 0.7rem;
    color: #111;
  }
  .link:hover {
    border-color: #999;
  }

  .btn {
    border: 1px solid #ccc;
    background: white;
    border-radius: 10px;
    padding: 0.45rem 0.7rem;
    cursor: pointer;
  }
  .btn:hover {
    border-color: #999;
  }

  .href {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
