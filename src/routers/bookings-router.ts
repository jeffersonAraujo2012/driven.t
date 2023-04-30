import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, getUserBookingWithRoom, changeBooking } from '@/controllers/bookings-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/', getUserBookingWithRoom);
bookingRouter.post('/', createBooking);
bookingRouter.put('/', changeBooking);

export { bookingRouter };
