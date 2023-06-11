import * as interfaces from '../interfaces';

export default (configuration: interfaces.request.IConfiguration) => {
	const options: {
		method?: string,
		body?: any,
		headers?: any,
	} = {
		headers: configuration.headers || {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: configuration.method || 'GET',
		body: JSON.stringify({ ...configuration.body }) || JSON.stringify({}),
	};

	if (options.method === 'GET') {
		delete options.body;
	}

	return fetch(
		`${configuration.host || process.env.REACT_APP_API_URL || ''}/${configuration.url}`,
		{ ...options },
	)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => { throw error; });
};
