import { getTracker } from './btc.api';
import request from '../../utils/request.util';

jest.mock('../../utils/request.util', () => jest.fn());

describe('BTC', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {

		await getTracker();

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: 'dev/get-btc-tracker',
			method: 'GET',
		});
	});
});
