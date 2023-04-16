import { Router } from 'express';
import { payTicket } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentRequestSchema } from '@/schemas/payments-schema';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.post('/process', validateBody(paymentRequestSchema), payTicket);

export { paymentsRouter };
