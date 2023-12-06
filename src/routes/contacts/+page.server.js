import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { AIRTABLE_TOKEN } from '$env/static/private';

const BASE_URL = 'https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ';
const headers = {
	Authorization: `Bearer ${AIRTABLE_TOKEN}`,
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

/**
 * This function is used to get the record from airtable where the phone number is the same as the number passed in.
 * It uses the airtable filterByFormula to do this. 
 * @param {string} number: the phone number in format like this: (xxx) xxx-xxxx 
 * @returns 
 */
const getRecord = async (number) => {
	// the end of this url is how we filter by phone
	let url = `https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ?filterByFormula=SEARCH("${number}", {Phone Number})`;
	url = encodeURI(url);
	const response = await fetch(url, {
		headers
	});
	return await response.json();
};

/**
 * We basically check if there is a record with the same phone number in airtable. If there is then we return false, else we return true 
 * @param {string} number : the phone number is format like this: (xxx) xxx-xxxx 
 * @returns boolean: true if the phone number is valid and false if it is not 
 */
const checkValidPhoneNumber = async (number) => {
	const { records } = await getRecord(number);
	if (records.length > 0) {
		return false;
	}
	return true;
};

/**
 *	Load is the function that is called when the page is loaded. So if you were to go to `localhost:3000/contacts` this function would be called 
 * 	Note in +page.svelte you will see the export let data, that is basically the data returned from this function.
 * @param {params} { url: pageURL } the function takes the url as a parameter. But this can be any other search parameters as well 
 * @returns the data for the page. This data is then passed to the page component as props. 
 */
export async function load({ url: pageURL }) {
	const number = pageURL.searchParams.get('number');
	if (!number) return { records: [], phone: '', content: '' };
	const data = await getRecord(number);
	return data;
}
export const actions = {
	searchRecord: async ({ url, request }) => {
		const data = await request.formData();
		const number = data.get('number');
		url.searchParams.set('number', number);
		throw redirect(302, url.href);
	},
	updateRecord: async ({ request }) => {
		const data = await request.formData();
		// because when updating on airtable the ID of the record we want to update has to be in the URL and not the body we first store that in a variable and then delete it from our data
		const id = data.get('id');
		data.delete('id');
		let url = `${BASE_URL}/${id}`;
		const requestData = {
			// object.fromEntries basically converts form to an Object
			fields: Object.fromEntries(data)
		};
		const response = await fetch(url, {
			headers,
			method: 'PATCH',
			// body to send to airtable needs to be in json format
			body: JSON.stringify(requestData)
		});
		const jsonRes = await response.json();
		return { success: true, message: "Record updated successfully", data: jsonRes}
	},
	createRecord: async ({ request }) => {
		const data = await request.formData();
		const phoneNumber = data.get('Phone Number');
		// see above for info
		const isValid = await checkValidPhoneNumber(phoneNumber);
		if (!isValid) {
			// if the phone number is not valid we return a 422 error and this updates the `form` variable in the frontend to show the error
			return fail(422, { phoneNumber, inExistence: true });
		}
		const parsedData = {
			records: [
				{
					fields: Object.fromEntries(data)
				}
			]
		}
		const response = await fetch(BASE_URL, {
			headers,
			method: 'POST',
			body: JSON.stringify(parsedData)
		});
		const jsonRes = await response.json();
		return { success: true, message: "Record created successfully", data: jsonRes}
	}
};
