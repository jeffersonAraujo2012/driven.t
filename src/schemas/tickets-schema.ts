import Joi from 'joi';

type CreateTicketReqBody = {
  ticketTypeId: number;
};

export const createTicketSchema = Joi.object<CreateTicketReqBody>({
  ticketTypeId: Joi.number().min(1).required(),
});
