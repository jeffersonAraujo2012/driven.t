import { Room } from '@prisma/client';
import { prisma } from '@/config';

async function getRoomById(roomId: number): Promise<Room> {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

const roomsRepositories = {
  getRoomById,
};

export default roomsRepositories;
