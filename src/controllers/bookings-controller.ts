import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

import bookingsService from '@/services/bookings-service';

export async function getUserBookingWithRoom(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;

  try {
    const booking = await bookingsService.getUserBookingWithRoom(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const { roomId } = req.body as { roomId: number };

  try {
    const bookingId = await bookingsService.createBooking({ userId, roomId: Number(roomId) });
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    next(error);
  }
}
