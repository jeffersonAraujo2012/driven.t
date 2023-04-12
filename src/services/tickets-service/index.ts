import { TicketTypeEntity } from '@/protocols';
import ticketRepositories from '@/repositories/ticket-repository';

async function getTicketTypes(): Promise<TicketTypeEntity[]> {
  const ticketTypes: TicketTypeEntity[] = await ticketRepositories.getTicketTypes();
  return ticketTypes;
}

const ticketService = {
  getTicketTypes,
};

export default ticketService;
