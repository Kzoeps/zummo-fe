import { redirect } from '@sveltejs/kit';
import { AIRTABLE_TOKEN } from '$env/static/private';

const BASE_URL = 'https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ';
const headers = {
	Authorization: `Bearer ${AIRTABLE_TOKEN}`,
	'Content-Type': 'application/json'
};

const getRecord = async (number) => {
	let url = `https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ?filterByFormula=SEARCH("${number}", {Phone Number})`;
	url = encodeURI(url);
	const response = await fetch(url, {
		headers
	});
	return await response.json();
};

export async function load({ url: pageURL }) {
	const number = pageURL.searchParams.get('number');
	if (!number) return { records: [], phone: '', content: '' };
	const data = await getRecord(number);
	console.log(data);
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
		const id = data.get('id');
		data.delete('id');
		let url = `${BASE_URL}/${id}`;
		const requestData = {
			fields: JSON.stringify(Object.fromEntries(data)) 
		};
		const response = await fetch(url, {
			headers,
			method: 'PATCH',
			body: JSON.stringify(requestData) 
		});
		return await response.json();
	}
};
