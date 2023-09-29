import { redirect } from '@sveltejs/kit';
import { AIRTABLE_TOKEN } from '$env/static/private';

const getRecord = async (number) => {
	let url = `https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ?filterByFormula=SEARCH("${number}", {Phone Number})`;
	url = encodeURI(url);
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${AIRTABLE_TOKEN}`
		}
	});
	return await response.json();
};

export async function load({ url: pageURL }) {
	const number = pageURL.searchParams.get('number');
	if (!number) return { records: [], phone: '', content: '' };
	const data = await getRecord(number);
	console.log(data)
	return data;
}
export const actions = {
	default: async ({ url, request }) => {
		const data = await request.formData();
		const number = data.get('number');
        url.searchParams.set('number', number);
        throw redirect(302, url.href);
	}
};
