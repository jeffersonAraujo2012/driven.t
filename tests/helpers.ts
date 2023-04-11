import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.address.deleteMany({});
<<<<<<< HEAD
=======
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
<<<<<<< HEAD
=======
  await prisma.ticketType.deleteMany({});
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
