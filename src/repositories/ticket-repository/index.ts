import { Prisma } from '.prisma/client';
import { prisma } from '@/config';
import { TicketEntity, TicketTypeEntity } from '@/protocols';

async function getTicketTypes(): Promise<TicketTypeEntity[]> {
  const ticketTypes = (await prisma.ticketType.findMany()) as TicketTypeEntity[];
  return ticketTypes;
}

async function getUserTicket(enrollmentId: number): Promise<TicketEntity> {
  const userTicket = await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    select: {
      id: true,
      status: true, //RESERVED | PAID
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return userTicket;
}

const ticketRepositories = {
  getTicketTypes,
  getUserTicket,
};

export default ticketRepositories;
