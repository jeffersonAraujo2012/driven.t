import { prisma } from '@/config';

type CreateBookingParams = {
  userId: number;
  roomId: number;
};

export async function createBooking({ userId, roomId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
