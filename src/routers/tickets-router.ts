import { Router } from 'express';
import { generateValidToken } from '../../tests/helpers';
import { getTicketTypes, getUserTicket, createTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter.get('/token', async (req, res) => {
  console.log(await generateValidToken());
  res.sendStatus(204);
});
ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', getUserTicket);
ticketsRouter.get('/types', getTicketTypes);
ticketsRouter.post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
