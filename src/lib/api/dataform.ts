import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { BioDataType } from '$lib/types';

export async function getBioData(): Promise<BioDataType> {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/dataform/`, {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		},

		method: 'GET'
	});

	const data = await response.json();
	console.log(response);
	if (!response.ok) {
		const error = await data.error;
		console.error('Error: ', error);
		throw new Error(error);
	}

	return data;
}
