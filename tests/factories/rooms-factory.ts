import faker from '@faker-js/faker';
import { Room } from '@prisma/client';
import { prisma } from '@/config';

type RoomWithStringDates = Omit<Room, 'updatedAt' | 'createdAt'> & {
  updatedAt: string;
  createdAt: string;
};

const typeRooms = [
  { name: 'Room tipo 1', capacity: 1 },
  { name: 'Room tipo 2', capacity: 2 },
  { name: 'Room tipo 3', capacity: 3 },
];

async function createRooms(hotelId: number): Promise<RoomWithStringDates> {
  const room = faker.helpers.arrayElement(typeRooms);

  const createdRoom = await prisma.room.create({
    data: {
      ...room,
      hotelId,
    },
  });

  return {
    ...createdRoom,
    updatedAt: createdRoom.updatedAt.toISOString(),
    createdAt: createdRoom.createdAt.toISOString(),
  };
}

export default createRooms;
