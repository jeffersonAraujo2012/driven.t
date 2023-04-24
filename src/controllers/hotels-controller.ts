import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getHotelWithRoomsByHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const hotelId = Number(req.params.hotelId);
  try {
    const hotel = await hotelsService.getHotelWithRoomsByHotelId({ userId, hotelId });
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    next(error);
  }
}
