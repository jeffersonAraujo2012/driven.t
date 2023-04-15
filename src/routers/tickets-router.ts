import { Router } from 'express';
import { generateValidToken } from '../../tests/helpers';
import { getTicketTypes, getUserTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/token', async (req, res) => {
  console.log(await generateValidToken());
  res.sendStatus(204);
});
ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', getUserTicket);
ticketsRouter.get('/types', getTicketTypes);

export { ticketsRouter };
