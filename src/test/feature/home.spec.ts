/**
 * @fileoverview Get home feature test
 */

import request from 'supertest';
import app from '../../app';

describe('Get Home', () => {
	test('It should returns success code', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
	});
});
