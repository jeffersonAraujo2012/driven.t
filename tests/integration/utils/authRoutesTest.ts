import httpStatus from 'http-status';
import supertest from 'supertest';
import { generateValidToken } from '../../helpers';

type authTestParams = {
  server: supertest.SuperTest<supertest.Test>;
  endpoint: string;
};

export function authRoutesTests({ server, endpoint }: authTestParams) {
  it('When token is invalid, it should receive 401 status', async () => {
    const token = await generateValidToken();
    const result = await server.get(endpoint).set('Authorization', `Bearer ${token}invalid`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('When there is no token, it should receive 401 status', async () => {
    const result = await server.get(endpoint);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
}
