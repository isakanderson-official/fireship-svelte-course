<script>
    import {fly} from 'svelte/transition';
    import {page} from '$app/stores';
</script>


<!-- Now when the page url changes, the component will be recreated, triggering the animation -->
{#key $page.url}
<div in:fly={{ x:'-100%', duration: 500}}>
    <slot/>
</div>
{/key}