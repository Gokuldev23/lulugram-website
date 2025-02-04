<script>
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	let { label, type = 'text', value = $bindable(), disabled,required = false, errorMsg} = $props();

	const dispatch = createEventDispatcher();

	const handleDispatch = (e) => {
		if (!e.target.value.trim()) return;
		let text = e.target.value.trim();
		dispatch('input', text);
	};
</script>

<div class="form-group">
	<textarea
		class:invalid={errorMsg}
		{disabled}
		bind:value
		placeholder=""
		id={label}
		oninput={handleDispatch}
		autocomplete="off"
		required={required}
	></textarea>
	<label for={label}>{label}</label>
	{#if errorMsg}
		<small transition:slide>{errorMsg}</small>
	{/if}
</div>

<style>
	.form-group {
		position: relative;
		width: 100%;
	}
	small {
		height: 15px;
		display: block;
		font-size: 12px;
		color: red;
	}
	textarea {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
		font-size: 1rem;
		transition: all ease;
		background-color: white;
		width: 100%;
		box-sizing: border-box;
        resize: none;
	}

	textarea:focus {
		border-color: #7c3aed;
		outline: 2px solid #7c3aed;
	}
	textarea.invalid {
		outline: 1px solid red;
		border: 1px solid red;
	}

	label {
		position: absolute;
		top: 45%;
		left: 0.5rem;
		transform: translateY(-50%);
		background: white;
		padding: 0 0.3rem;
		font-size: 1rem;
		color: #777;
		transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		pointer-events: none;
	}


	textarea:focus + label,
	textarea:not(:placeholder-shown) + label {
		top: -3px;
		left: 0.4rem;
		font-size: 0.8rem;
		color: #7c3aed;
	}
	textarea.invalid:focus + label,
	textarea.invalid:not(:placeholder-shown) + label {
		color: red;
	}
	textarea:disabled {
		opacity: 0.7;
	}

	textarea::-webkit-outer-spin-button,
	textarea::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	textarea[type='number'] {
		-moz-appearance: textfield;
	}
</style>
