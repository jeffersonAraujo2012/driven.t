import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest, handleApplicationErrors } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { GetPaymentByTicketIdRequest, PaymentRequest } from '@/protocols';

async function payTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const { ticketId, cardData } = req.body as PaymentRequest;

  try {
    const paymentCreated = await paymentsService.payTicket({ ticketId, cardData, userId });
    res.sendStatus(httpStatus.CREATED).send(paymentCreated);
  } catch (error) {
    //next(error) //NOT WORKING
    handleApplicationErrors(error, req, res);
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
    console.log('SIM, CAPTUREI UM ERRO!');
    console.log('OLHA ELE AÍ: ' + err.name);
    //next(err); //NOT WORKING
    handleApplicationErrors(err, req, res);
  }
}

export { payTicket, getPaymentByTicketId };
