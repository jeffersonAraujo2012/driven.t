import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEvent } from '../factories';
import { cleanDb } from '../helpers';
<<<<<<< HEAD
import app, { init, close } from '@/app';
=======
import app, { init } from '@/app';
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

beforeAll(async () => {
  await init();
  await cleanDb();
});

<<<<<<< HEAD
afterAll(async () => {
  await close();
});

=======
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
const server = supertest(app);

describe('GET /event', () => {
  it('should respond with status 404 if there is no event', async () => {
    const response = await server.get('/event');

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and event data if there is an event', async () => {
    const event = await createEvent();

    const response = await server.get('/event');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: event.id,
      title: event.title,
      backgroundImageUrl: event.backgroundImageUrl,
      logoImageUrl: event.logoImageUrl,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt.toISOString(),
    });
  });
});
