import supertest from 'supertest';
import httpStatus from 'http-status';
import { Hotel } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createCustomTicketType,
  createEnrollmentWithAddress,
  createTicket,
  createTicketType,
  createUser,
} from '../factories';
import createHotel from '../factories/hotels-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('When token is invalid, it should receive 401 status', async () => {
    const token = await generateValidToken();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}invalid`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('When there is no token, it should receive 401 status', async () => {
    const result = await server.get('/hotels');
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('Should get 404 status if there is no user enrollments', async () => {
      const token = await generateValidToken();
      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 404 status if there is user enrollments but not ticket', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 404 status if there is no hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 402 status if ticket is remote', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: true, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get 402 status if ticket does not include hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: false });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get 402 status if ticket is not paid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'RESERVED');

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get status 200 and with hotels data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');
      const hotel = await createHotel();

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      //expect(result.status).toBe(httpStatus.OK);

      expect(result.body).toContainEqual(JSON.parse(JSON.stringify(hotel)));
    });
  });
});

describe('GET /hotels/:hotelId', () => {
  it('When token is invalid, it should receive 401 status', async () => {
    const token = await generateValidToken();
    const result = await server.get('/hotels/1').set('Authorization', `Bearer ${token}invalid`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('When there is no token, it should receive 401 status', async () => {
    const result = await server.get('/hotels/1');
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('Should get 404 status if there is no user enrollments', async () => {
      const token = await generateValidToken();
      const result = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 404 status if there is user enrollments but not ticket', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const result = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 404 status if there is no hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');
      const result = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should get 402 status if ticket is remote', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: true, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');
      const hotel = await createHotel();

      const result = await server.get('/hotels/' + hotel.id).set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get 402 status if ticket does not include hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: false });
      await createTicket(enrollment.id, ticketType.id, 'PAID');
      const hotel = await createHotel();

      const result = await server.get('/hotels/' + hotel.id).set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get 402 status if ticket is not paid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'RESERVED');
      const hotel = await createHotel();

      const result = await server.get('/hotels/' + hotel.id).set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should get status 200 and with hotels data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');
      const hotel = await createHotel();

      const result = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
      //expect(result.status).toBe(httpStatus.OK);

      expect(result.body).toContainEqual(JSON.parse(JSON.stringify(hotel)));
    });
  });
});
