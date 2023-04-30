import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';
import { CreateBookingReturn } from '@/protocols';

type UserBookingWithRoomProps = {
  id: number;
  Room: Room;
};

async function getUserBookingWithRoom(userId: number): Promise<UserBookingWithRoomProps> {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function getBookingsByRoomId(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
  });
}

type CreateBookingParams = {
  userId: number;
  roomId: number;
};

async function createBooking({ userId, roomId }: CreateBookingParams): Promise<CreateBookingReturn> {
  const { id } = await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
  return {
    bookingId: id,
  };
}

const bookingsRepositories = {
  getUserBookingWithRoom,
  getBookingsByRoomId,
  createBooking,
};

export default bookingsRepositories;
