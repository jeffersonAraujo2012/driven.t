import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from '@/controllers';
<<<<<<< HEAD
import { createOrUpdateEnrollmentSchema } from '@/schemas';
=======
import { createEnrollmentSchema } from '@/schemas';
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

const enrollmentsRouter = Router();

enrollmentsRouter
  .get('/cep', getAddressFromCEP)
  .all('/*', authenticateToken)
  .get('/', getEnrollmentByUser)
<<<<<<< HEAD
  .post('/', validateBody(createOrUpdateEnrollmentSchema), postCreateOrUpdateEnrollment);
=======
  .post('/', validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

export { enrollmentsRouter };
