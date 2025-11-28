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

export async function updateUserData(key: string, data: Array<Record<string, string>>) {
	const body = {
		key: key,
		data: data
	};
	const response = await fetch(`${PUBLIC_API_BASE_URL}/dataform/update-user-data`, {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		},
		method: 'POST',
		body: JSON.stringify(body)
	});

	const resData = await response.json();
	console.log(response);
	if (!response.ok) {
		const error = await resData.error;
		console.error('Error: ', error);
		throw new Error(error);
	}

	return true;
}
