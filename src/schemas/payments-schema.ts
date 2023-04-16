import Joi from 'joi';
import { PaymentRequest } from '@/protocols';

export const paymentRequestSchema = Joi.object<PaymentRequest>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required(),
  }).required(),
});
