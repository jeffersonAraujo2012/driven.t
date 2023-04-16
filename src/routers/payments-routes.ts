import { Router } from 'express';
import { payTicket, getPaymentByTicketId } from '@/controllers/payments-controller';
import { authenticateToken, validateBody, validateQueries } from '@/middlewares';
import { getPaymentByTicketIdRequestSchema, paymentRequestSchema } from '@/schemas/payments-schema';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .post('/process', validateBody(paymentRequestSchema), payTicket)
  .get('/', validateQueries(getPaymentByTicketIdRequestSchema), getPaymentByTicketId);

export { paymentsRouter };
