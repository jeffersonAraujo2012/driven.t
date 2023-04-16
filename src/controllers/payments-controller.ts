import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentRequest } from '@/protocols';

async function payTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketId, cardData } = req.body as PaymentRequest;

  try {
    const paymentCreated = await paymentsService.payTicket({ ticketId, cardData, userId });
    res.sendStatus(httpStatus.CREATED).send(paymentCreated);
  } catch (error) {
    if (error.name === 'notFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === 'unauthorizedPaymentError') {
      res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
  }
}

export { payTicket };
