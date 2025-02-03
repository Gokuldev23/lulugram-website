import { writable } from 'svelte/store';

// Reactive variable to manage the active page
export let activePage = writable('home');