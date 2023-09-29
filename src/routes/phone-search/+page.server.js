import { AIRTABLE_TOKEN } from '$env/static/private'

export async function load({url: pageURL}) {
    const number = pageURL.searchParams.get("number");
    if (!number) return {records: [], phone: "", content: ""}
    let url = `https://api.airtable.com/v0/appr8SepSgx9SP6ir/tblXBR1YTXYvGhwWJ?filterByFormula=SEARCH("${number}", {Phone Number})`
    url = encodeURI(url)
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${AIRTABLE_TOKEN}`
        }
    })
    const data = await response.json()
    return {
        records: data,
        phone: `1892329`,
        content: `This is the content for thimphu`
    }
}
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        console.log(data.get("number"))
        return ""
    }
}