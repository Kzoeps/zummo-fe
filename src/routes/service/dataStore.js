// Allows for data fetched from airtable to be accessed by the search and tune up components
import { writable } from 'svelte/store';

export const serviceDataStore = writable(null);

export const employeeDataStore = writable(null);