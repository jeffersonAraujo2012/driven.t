import { ApplicationError } from '@/protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

export function unauthorizedPaymentError(): ApplicationError {
  return {
    name: 'UnauthorizedPaymentError',
    message: 'You dont have tickets',
  };
}

export function unauthorizedOwnerError(message: string): ApplicationError {
  return {
    name: 'UnauthorizedOwnerError',
    message,
  };
}
