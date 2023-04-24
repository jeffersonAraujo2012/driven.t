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

const hotelsService = {
  getHotels,
};

export default hotelsService;
