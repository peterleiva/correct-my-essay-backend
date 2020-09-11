/**
 * @file Get home feature test
 */

import request from 'supertest';
import app from 'src/app';

describe('Get Home', () => {
	it('Should return 200 success code', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
	});
});
