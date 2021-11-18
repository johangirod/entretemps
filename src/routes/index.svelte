<script lang="ts">
	import { computeTotalTime } from '$lib/Timespan';
	import { fly } from 'svelte/transition';
	import '../app.css';

	let text: string = '';
</script>

<svelte:head>
	<title>Entretemps : timespan calculator</title>
</svelte:head>

<div class="p-4 max-w-xl mx-auto flex flex-col">
	<h1 class="text-4xl leading-10 my-16 text-purple-900">Entretemps</h1>

	<textarea
		bind:value={text}
		rows="20"
		class="shadow hover:shadow-md outline-none resize-none rounded bg-purple-100 p-4 transition-all focus:ring-4 ring-purple-400"
		spellcheck="false"
	/>

	{#if text}
		<p class="text-lg my-4" transition:fly>
			Journées de 6.5h : <span class="shadow py-1 px-2 bg-purple-100 "
				>{computeTotalTime(text)}</span
			>
		</p>
	{/if}
</div>
