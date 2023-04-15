import { notFoundError } from '@/errors';
import { TicketEntity, TicketTypeEntity } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepositories from '@/repositories/ticket-repository';

async function getTicketTypes(): Promise<TicketTypeEntity[]> {
  const ticketTypes: TicketTypeEntity[] = await ticketRepositories.getTicketTypes();
  return ticketTypes;
}

async function getUserTicket(userId: number): Promise<TicketEntity> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const userTicket: TicketEntity = await ticketRepositories.getUserTicket(enrollment.id);
  if (Object.keys(userTicket).length === 0) throw notFoundError();

  return userTicket;
}

const ticketService = {
  getTicketTypes,
  getUserTicket,
};

export default ticketService;
