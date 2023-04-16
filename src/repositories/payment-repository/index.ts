import { Payment } from '.prisma/client';
import { PaymentRequest } from '../../protocols';
import { prisma } from '@/config';

async function payTicket({ ticketId, ticket, cardData }: PaymentRequest): Promise<Payment> {
  const paymentCreated = await prisma.payment.create({
    data: {
      cardIssuer: cardData.issuer,
      value: ticket.TicketType.price,
      cardLastDigits: cardData.number.toString().substring(16),
      ticketId: ticketId,
    },
  });

  return paymentCreated;
}

const paymentRepositories = {
  payTicket,
};

export default paymentRepositories;
