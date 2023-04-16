import Joi from 'joi';
import { GetPaymentByTicketIdRequest, PaymentRequest } from '@/protocols';

export const paymentRequestSchema = Joi.object<PaymentRequest>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});

export const getPaymentByTicketIdRequestSchema = Joi.object<GetPaymentByTicketIdRequest>({
  ticketId: Joi.number().required(),
});
