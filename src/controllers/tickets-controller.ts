import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { CreateTicketRequest, TicketEntity, TicketTypeEntity } from '@/protocols';
import ticketService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(_req: Request, res: Response, next: NextFunction) {
  try {
    const ticketTypes: TicketTypeEntity[] = await ticketService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    next(error);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const userTicket: TicketEntity = await ticketService.getUserTicket(userId);
    res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    next(error);
  }
}

export type CreateTicketParams = {
  userId: number;
  ticketTypeId: number;
  enrollmentId?: number;
};

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const { ticketTypeId } = req.body as CreateTicketRequest;
  const createTicketParams: CreateTicketParams = {
    userId,
    ticketTypeId,
  };

  try {
    const ticketCreated = await ticketService.createTicket(createTicketParams);
    res.status(httpStatus.CREATED).send(ticketCreated);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    next(error);
  }
}
