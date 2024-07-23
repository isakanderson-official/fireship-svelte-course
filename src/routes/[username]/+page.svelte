<script lang="ts">
    import UserLink from '$lib/components/UserLink.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<svelte:head>
    <title>@{data.username} Links</title>
    <meta name='description' content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
    <h1 class="text-7xl text-primary">@{data.username}</h1>

    <img src={data.photoURL} alt={`${data.username} profile photo`} class="mx-auto" width="256"/>
    <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
    <ul class="list-none">
      {#each data.links as item}
       <li>
        <UserLink {...item}/>
       </li>
      {/each}
    </ul>
</main>