import { Payment } from '.prisma/client';
import { notFoundError, unauthorizedOwnerError } from '@/errors';
import { PaymentRequest } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepositories from '@/repositories/ticket-repository';
import paymentRepositories from '@/repositories/payment-repository';

type PaymentRequestWithUserId = PaymentRequest & {
  userId: number;
};

type GetPaymentByTicketId = {
  ticketId: number;
  userId: number;
};

async function payTicket({ ticketId, cardData, userId }: PaymentRequestWithUserId): Promise<Payment> {
  const ticket = await ticketRepositories.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedOwnerError('You must be the ticket owner');

  const payment = await paymentRepositories.payTicket({ ticketId, ticket, cardData });

  return payment;
}

async function getPaymentByTicketId({ ticketId, userId }: GetPaymentByTicketId): Promise<Payment> {
  const ticket = await ticketRepositories.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedOwnerError('You must be the ticket owner');

  return paymentRepositories.getPaymentByTicketId(ticketId);
}

const paymentsService = {
  payTicket,
  getPaymentByTicketId,
};

export default paymentsService;
