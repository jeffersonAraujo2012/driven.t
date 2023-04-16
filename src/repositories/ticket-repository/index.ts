import { Prisma, Ticket } from '.prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/controllers/tickets-controller';
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

async function getTicketById(ticketId: number): Promise<TicketEntity> {
  const ticket = await prisma.ticket.findUnique({
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

  return ticket;
}

type CreateTicketRepositoryParams = Pick<CreateTicketParams, 'ticketTypeId' | 'enrollmentId'>;

async function createTicket(createTicketParams: CreateTicketRepositoryParams): Promise<TicketEntity> {
  const { ticketTypeId, enrollmentId } = createTicketParams;

  const ticketCreated = await prisma.ticket.create({
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

  return ticketCreated;
}

const ticketRepositories = {
  getTicketTypes,
  getTicketById,
  getUserTicket,
  createTicket,
};

export default ticketRepositories;
