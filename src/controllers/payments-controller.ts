import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentRequest } from '@/protocols';

async function payTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const { ticketId, cardData } = req.body as PaymentRequest;

  try {
    const paymentCreated = await paymentsService.payTicket({ ticketId, cardData, userId });
    res.status(httpStatus.OK).send(paymentCreated);
  } catch (error) {
    next(error);
  }
}

type AuthenticatedWithTicketIdQueryRequest = AuthenticatedRequest & {
  query: {
    ticketId: number;
  };
};

async function getPaymentByTicketId(req: AuthenticatedWithTicketIdQueryRequest, res: Response, next: NextFunction) {
  const ticketId = Number(req.query.ticketId);
  const userId = Number(req.userId);

  try {
    const payment = await paymentsService.getPaymentByTicketId({ ticketId, userId });
    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    next(err);
  }
}

export { payTicket, getPaymentByTicketId };
