import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { TicketTypeEntity } from '@/protocols';
import ticketService from '@/services/tickets-service';

export async function getTicketTypes(_req: Request, res: Response) {
  try {
    const ticketTypes: TicketTypeEntity[] = await ticketService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {}
}
