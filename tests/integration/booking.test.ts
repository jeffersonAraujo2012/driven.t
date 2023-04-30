import { create } from 'domain';
import supertest from 'supertest';
import { createCustomTicketType, createEnrollmentWithAddress, createTicket, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import createHotel from '../factories/hotels-factory';
import createRooms from '../factories/rooms-factory';
import { createBooking } from '../factories/bookings-factory';
import { authRoutesTests } from './utils/authRoutesTest';
import app, { init } from '@/app';

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await cleanDb();
});

describe('GET /booking', () => {
  authRoutesTests({ server, endpoint: '/booking' });

  describe('If token is valid', () => {
    it('It should get status 404 if user has no booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const result = await server.get('/booking').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(404);
    });

    it('It should get status 200 with booking data', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      //const enrollment = await createEnrollmentWithAddress(user);
      //const ticketType = await createCustomTicketType({isRemote: false, includesHotel: true});
      //const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID');
      const hotel = await createHotel();
      const room = await createRooms(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });

      const result = await server.get('/booking').set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        id: booking.id,
        Room: room,
      });
    });
  });
});

describe('POST /booking', () => {
  authRoutesTests({ server, endpoint: '/booking' });

  describe('If token is valid', () => {
    it('It should get status 403 if user has no tiket', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 403 if user ticket is remote', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: true, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 403 if user ticket not includes hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: false });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 403 if user ticket is not paid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'RESERVED');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 404 if roomId not exists', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: 0,
      });
      expect(result.status).toBe(404);
    });

    it('It should get status 403 if roomId exists but no capacity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      for (let i = 0; i < room.capacity; i++) {
        const otherUser = await createUser();
        await createBooking({ userId: otherUser.id, roomId: room.id });
      }

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 200 with bookingId', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        bookingId: result.body?.bookingId,
      });
    });
  });
});

describe('PUT /booking/:bookingId', () => {
  authRoutesTests({ server, endpoint: '/booking' });

  describe('If token is valid', () => {
    it('It should get status 403 if user has no booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);

      const result = await server.put('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 403 if new room has no capacity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);
      const newRoom = await createRooms(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });

      for (let i = 0; i < newRoom.capacity; i++) {
        const otherUser = await createUser();
        await createBooking({ userId: otherUser.id, roomId: newRoom.id });
      }

      const result = await server.put('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: newRoom.id,
      });
      expect(result.status).toBe(403);
    });

    it('It should get status 404 if new roomId not exists', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });

      const result = await server.put('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: 0,
      });
      expect(result.status).toBe(404);
    });

    it('It should get status 200 with bookingId', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createCustomTicketType({ isRemote: false, includesHotel: true });
      await createTicket(enrollment.id, ticketType.id, 'PAID');

      const hotel = await createHotel();
      const room = await createRooms(hotel.id);
      const newRoom = await createRooms(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });

      const result = await server.put('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: newRoom.id,
      });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        bookingId: booking.id,
      });
    });
  });
});
