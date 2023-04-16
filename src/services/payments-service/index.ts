import { Payment } from '.prisma/client';
import { notFoundError, unauthorizedPaymentError } from '@/errors';
import { PaymentRequest } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepositories from '@/repositories/ticket-repository';
import paymentRepositories from '@/repositories/payment-repository';

type PaymentRequestWithUserId = PaymentRequest & {
  userId: number;
};

async function payTicket({ ticketId, cardData, userId }: PaymentRequestWithUserId): Promise<Payment> {
  const ticket = await ticketRepositories.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const userTicket = await ticketRepositories.getUserTicket(enrollment.id);
  if (!userTicket) throw unauthorizedPaymentError();

  const payment = await paymentRepositories.payTicket({ ticketId, ticket, cardData });

  return payment;
}

const paymentsService = {
  payTicket,
};

export default paymentsService;
