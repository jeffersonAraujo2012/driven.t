import { forbiddenError, notFoundError } from '@/errors';
import { CreateBookingReturn } from '@/protocols';
import bookingsRepositories from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomsRepositories from '@/repositories/room-repository';
import ticketRepositories from '@/repositories/ticket-repository';

async function getUserBookingWithRoom(userId: number) {
  const booking = await bookingsRepositories.getUserBookingWithRoom(userId);
  if (!booking) throw notFoundError();
  return booking;
}

type CreateBookingParams = {
  userId: number;
  roomId: number;
};

async function createBooking({ userId, roomId }: CreateBookingParams): Promise<CreateBookingReturn> {
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

const bookingsService = {
  getUserBookingWithRoom,
  createBooking,
};

export default bookingsService;
