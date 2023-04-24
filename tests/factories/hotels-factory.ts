import faker from '@faker-js/faker';
import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

type NewHotelParams = Pick<Hotel, 'name' | 'image'>;

const newHotel: NewHotelParams = {
  name: faker.company.companyName(),
  image: faker.image.city(),
};

async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: newHotel,
  });
}

export default createHotel;
