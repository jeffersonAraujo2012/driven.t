import faker from '@faker-js/faker';
import { TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

type CustomTicketType = Partial<Omit<TicketType, 'id' | 'createdAt' | 'updatedAt'>>;

export async function createCustomTicketType(ticketType: CustomTicketType) {
  const { name, price, isRemote, includesHotel } = ticketType;
  return prisma.ticketType.create({
    data: {
      name: name || faker.name.findName(),
      price: price || faker.datatype.number(),
      isRemote: isRemote || faker.datatype.boolean(),
      includesHotel: includesHotel || faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
