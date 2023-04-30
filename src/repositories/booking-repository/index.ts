import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';
import { CreateOrChangeBookingReturn } from '@/protocols';

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

async function getBookingsByUserId(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
  });
}

type CreateBookingParams = {
  userId: number;
  roomId: number;
};

async function createBooking({ userId, roomId }: CreateBookingParams): Promise<CreateOrChangeBookingReturn> {
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

type ChangeBookingParams = CreateBookingParams & {
  bookingId: number;
};

async function changeBooking({ bookingId, userId, roomId }: ChangeBookingParams): Promise<CreateOrChangeBookingReturn> {
  const { id } = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
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
  getBookingsByUserId,
  createBooking,
  changeBooking,
};

export default bookingsRepositories;
