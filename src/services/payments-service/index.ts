import { Payment } from '.prisma/client';
import { notFoundError, unauthorizedOwnerError, unauthorizedPaymentError } from '@/errors';
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

  const userTicket = await ticketRepositories.getUserTicket(enrollment.id);
  if (!userTicket) throw unauthorizedPaymentError();

  const payment = await paymentRepositories.payTicket({ ticketId, ticket, cardData });

  return payment;
}

async function getPaymentByTicketId({ ticketId, userId }: GetPaymentByTicketId): Promise<Payment> {
  const ticket = await ticketRepositories.getTicketById(ticketId);
  console.log('Nenhum erro lançado até agora... =)');
  if (!ticket) throw notFoundError();

  //console.log('Nenhum erro lançado até agora... =)');
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedOwnerError('You must be the ticket owner');

  //console.log('Nenhum erro lançado até agora... =)');
  const payment = await paymentRepositories.getPaymentByTicketId(ticketId);

  return payment;
}

const paymentsService = {
  payTicket,
  getPaymentByTicketId,
};

export default paymentsService;
