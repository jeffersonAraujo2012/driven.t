import { Prisma, Ticket } from '.prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/controllers/tickets-controller';
import { TicketEntity, TicketTypeEntity } from '@/protocols';

async function getTicketTypes(): Promise<TicketTypeEntity[]> {
  const ticketTypes = (await prisma.ticketType.findMany()) as TicketTypeEntity[];
  return ticketTypes;
}

async function getUserTicket(enrollmentId: number): Promise<TicketEntity> {
  return prisma.ticket.findFirst({
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
}

async function getTicketById(ticketId: number): Promise<TicketEntity> {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
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
}

type CreateTicketRepositoryParams = Pick<CreateTicketParams, 'ticketTypeId' | 'enrollmentId'>;

async function createTicket(createTicketParams: CreateTicketRepositoryParams): Promise<TicketEntity> {
  const { ticketTypeId, enrollmentId } = createTicketParams;

  return prisma.ticket.create({
    data: {
      status: 'RESERVED',
      enrollmentId: enrollmentId,
      ticketTypeId: ticketTypeId,
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
}

const ticketRepositories = {
  getTicketTypes,
  getTicketById,
  getUserTicket,
  createTicket,
};

export default ticketRepositories;
