import { Payment } from '.prisma/client';
import { PaymentRequest } from '../../protocols';
import { prisma } from '@/config';

async function payTicket({ ticketId, ticket, cardData }: PaymentRequest): Promise<Payment> {
  const [paymentCreated] = await prisma.$transaction([
    prisma.payment.create({
      data: {
        cardIssuer: cardData.issuer,
        value: ticket.TicketType.price,
        cardLastDigits: cardData.number.toString().slice(-4),
        ticketId: ticketId,
      },
    }),
    prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: 'PAID',
      },
    }),
  ]);

  return paymentCreated;
}

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });

  return payment;
}

const paymentRepositories = {
  payTicket,
  getPaymentByTicketId,
};

export default paymentRepositories;
