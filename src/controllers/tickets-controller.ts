import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { TicketEntity, TicketTypeEntity } from '@/protocols';
import ticketService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(_req: Request, res: Response) {
  try {
    const ticketTypes: TicketTypeEntity[] = await ticketService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {}
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const getUserTicket: TicketEntity = await ticketService.getUserTicket(userId);
    res.status(httpStatus.OK).send(getUserTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
