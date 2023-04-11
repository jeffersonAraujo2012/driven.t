import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
<<<<<<< HEAD
  if (prisma) {
    return;
  }

=======
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
