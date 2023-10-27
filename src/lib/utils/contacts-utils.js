// all the logic below is to format the phone number like this: (214) 180-1323
// since it is saved like this in airtable and we need to filter and search for it in the exact fashion
// lemme know if you have a smarter way to do this.
export const formatNumber = (number) => {
	const individualNumbers = number.split('').filter((n) => !isNaN(n) && n !== ' ');
	let formattedNumber = '';
	individualNumbers.forEach((num, i) => {
		if (i === 0) {
			formattedNumber = `(${num}`;
		} else if (i === 2) {
			formattedNumber += `${num})`;
		} else if (i == 3) {
			formattedNumber += ` ${num}`;
		} else if (i === 5) {
			formattedNumber += `${num}-`;
		} else {
			formattedNumber += num;
		}
	});
	return formattedNumber;
};

export const CONTACT_MODAL = {
	'First Name': '',
	'Last Name': '',
	'Phone Number': '',
	'Street Address': '',
	City: '',
	Zip: '',
	State: ''
};
