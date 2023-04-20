import { Payment, Ticket } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade?: string;
  cidade?: string;
  uf: string;
  erro?: boolean;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type GetAddressFromCEPQuery = {
  cep: string;
};

export type TicketTypeEntity = {
  id: number;
  name: string;
  price: number;
  isRemote: boolean;
  includesHotel: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TicketEntity = {
  id: number;
  status: 'RESERVED' | 'PAID';
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: {
    id: number;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTicketRequest = {
  ticketTypeId: number;
};

export type CardData = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type PaymentRequest = {
  ticketId: number;
  ticket?: TicketEntity;
  cardData: CardData;
};

export type GetPaymentByTicketIdRequest = {
  ticketId: number;
};
