import { Prisma } from '.prisma/client';
import { prisma } from '@/config';
import { TicketTypeEntity } from '@/protocols';

async function getTicketTypes(): Promise<TicketTypeEntity[]> {
  const ticketTypes = (await prisma.ticketType.findMany()) as TicketTypeEntity[];
  return ticketTypes;
}

const ticketRepositories = {
  getTicketTypes,
};

export default ticketRepositories;
