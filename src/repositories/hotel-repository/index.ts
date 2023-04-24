import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findAll(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findWithRoomsById(hotelId: number): Promise<Hotel> {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

const hotelsRepositories = {
  findAll,
  findWithRoomsById,
};

export default hotelsRepositories;
