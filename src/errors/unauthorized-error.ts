import { ApplicationError } from '@/protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

export function unauthorizedOwnerError(message: string): ApplicationError {
  return {
    name: 'UnauthorizedOwnerError',
    message,
  };
}
