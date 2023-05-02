import { forbiddenError, notFoundError } from '@/errors';
import { CreateOrChangeBookingReturn } from '@/protocols';
import bookingsRepositories from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomsRepositories from '@/repositories/room-repository';
import ticketRepositories from '@/repositories/ticket-repository';

async function getUserBookingWithRoom(userId: number) {
  const booking = await bookingsRepositories.getUserBookingWithRoom(userId);
  if (!booking) throw notFoundError();
  return booking;
}

type CreateOrChangeBookingParams = {
  userId: number;
  roomId: number;
};

async function createBooking({ userId, roomId }: CreateOrChangeBookingParams): Promise<CreateOrChangeBookingReturn> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenError('User has not enrollment');

  const ticket = await ticketRepositories.getUserTicket(enrollment.id);
  if (
    !ticket ||
    ticket.status !== 'PAID' ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  ) {
    throw forbiddenError(`
      Ticket is not available for get booking or not exists.
      Please, check if ticket is PAID, includes hotel 
      and is not remote.
    `);
  }

  const room = await roomsRepositories.getRoomById(roomId);
  if (!room) throw notFoundError();

  const bookingsOfRoom = await bookingsRepositories.getBookingsByRoomId(roomId);
  if (room.capacity === bookingsOfRoom.length)
    throw forbiddenError(`
    Room has not capacity
  `);

  return bookingsRepositories.createBooking({ userId, roomId });
}

type ChangeBookingParams = CreateOrChangeBookingParams & {
  bookingId: number;
};

async function changeBooking({ bookingId, userId, roomId }: ChangeBookingParams): Promise<CreateOrChangeBookingReturn> {
  const booking = await bookingsRepositories.getBookingsByUserId(userId);
  if (!booking || booking.id !== bookingId) throw forbiddenError('You has not a booking');

  const room = await roomsRepositories.getRoomById(roomId);
  if (!room) throw notFoundError();

  const bookingsRoom = await bookingsRepositories.getBookingsByRoomId(room.id);
  if (room.capacity === bookingsRoom.length) throw forbiddenError(`Room has not capacity`);

  return bookingsRepositories.changeBooking({ bookingId: booking.id, roomId, userId });
}

const bookingsService = {
  getUserBookingWithRoom,
  createBooking,
  changeBooking,
};

export default bookingsService;
