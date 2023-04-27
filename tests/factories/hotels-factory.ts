import faker from '@faker-js/faker';
import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

type NewHotelParams = Pick<Hotel, 'name' | 'image'>;

type HotelWithStringDates = Omit<Hotel, 'updatedAt' | 'createdAt'> & {
  updatedAt: string;
  createdAt: string;
};

async function createHotel(): Promise<HotelWithStringDates> {
  const newHotel: NewHotelParams = {
    name: faker.company.companyName(),
    image: faker.image.city(),
  };

  const hotel = await prisma.hotel.create({
    data: newHotel,
  });

  return {
    ...hotel,
    createdAt: hotel.createdAt.toISOString(),
    updatedAt: hotel.updatedAt.toISOString(),
  };
}

export default createHotel;
