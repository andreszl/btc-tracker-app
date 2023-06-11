import request from '../../utils/request.util';

export async function getTracker() {
	return request({
		url: 'dev/get-btc-tracker',
		method: 'GET',
	});
}
