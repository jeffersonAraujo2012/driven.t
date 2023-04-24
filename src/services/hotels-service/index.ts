import ticketService from '../tickets-service';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepositories from '@/repositories/hotel-repository';
import { paymentRequired } from '@/errors/payment-required';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketService.getUserTicket(userId);
  const hotels = await hotelsRepositories.findAll();

  if (!enrollment || !ticket) throw notFoundError();
  if (ticket.TicketType.isRemote) throw paymentRequired('Ticket is remote');
  if (ticket.status !== 'PAID') throw paymentRequired('Ticket is not paid');
  if (!ticket.TicketType.includesHotel) throw paymentRequired('Ticket does not include hotel');
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

type GetRoomsByHotelIdParams = { userId: number; hotelId: number };

async function getHotelWithRoomsByHotelId({ userId, hotelId }: GetRoomsByHotelIdParams) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketService.getUserTicket(userId);
  const hotel = await hotelsRepositories.findWithRoomsById(hotelId);

  if (!enrollment || !ticket) throw notFoundError();
  if (ticket.TicketType.isRemote) throw paymentRequired('Ticket is remote');
  if (ticket.status !== 'PAID') throw paymentRequired('Ticket is not paid');
  if (!ticket.TicketType.includesHotel) throw paymentRequired('Ticket does not include hotel');
  if (!hotel) throw notFoundError();

  return hotel;
}

const hotelsService = {
  getHotels,
  getHotelWithRoomsByHotelId,
};

export default hotelsService;
