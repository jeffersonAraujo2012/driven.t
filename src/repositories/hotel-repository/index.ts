import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findAll(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

const hotelsRepositories = {
  findAll,
};

export default hotelsRepositories;
