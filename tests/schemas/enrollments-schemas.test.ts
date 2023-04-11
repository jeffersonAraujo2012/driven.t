import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { faker } from '@faker-js/faker';
<<<<<<< HEAD
import { createOrUpdateEnrollmentSchema } from '@/schemas';
=======
import { createEnrollmentSchema } from '@/schemas';
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

describe('createEnrollmentSchema', () => {
  const generateValidInput = () => ({
    name: faker.name.findName(),
    cpf: generateCPF(),
    birthday: faker.date.past().toISOString(),
    phone: '(21) 98999-9999',
    address: {
      cep: '90830-563',
      street: faker.address.streetName(),
      city: faker.address.city(),
      number: faker.datatype.number().toString(),
      state: faker.helpers.arrayElement(getStates()).code,
      neighborhood: faker.address.secondaryAddress(),
      addressDetail: faker.lorem.sentence(),
    },
  });

  it('should return an error if input is not present', () => {
<<<<<<< HEAD
    const result = createOrUpdateEnrollmentSchema.validate(null);
=======
    const result = createEnrollmentSchema.validate(null);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

    expect(result.error).toBeDefined();
  });

  describe('name', () => {
    it('should return error if name is not present', () => {
      const input = generateValidInput();
      delete input.name;

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return error if name is less than 3 characters', () => {
      const input = generateValidInput();
      input.name = faker.lorem.word(2);

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });
  });

  describe('cpf', () => {
    it('should return error if cpf is not present', () => {
      const input = generateValidInput();
      delete input.cpf;

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return error if cpf is invalid', () => {
      const input = generateValidInput();
      input.cpf = '12345678901';

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return error if cpf is masked', () => {
      const input = generateValidInput();
      input.cpf = '012.345.678-90';

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });
  });

  describe('birthday', () => {
    it('should return error if birthday is not present', () => {
      const input = generateValidInput();
      delete input.birthday;

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return an error if birthday is not an iso date', () => {
      const input = generateValidInput();
      input.birthday = 'not an iso date';

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });
  });

  describe('phone', () => {
    it('should return error if phone is not present', () => {
      const input = generateValidInput();
      delete input.phone;

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return error if phone is not a mobile phone', () => {
      const input = generateValidInput();
      input.phone = '1234567890';

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    it('should return error if phone is not masked', () => {
      const input = generateValidInput();
      input.phone = '12999887766';

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });
  });

  describe('address', () => {
    it('should return error if address is not present', () => {
      const input = generateValidInput();
      delete input.address;

<<<<<<< HEAD
      const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
      const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

      expect(error).toBeDefined();
    });

    describe('cep', () => {
      it('should return error if cep is not present', () => {
        const input = generateValidInput();
        delete input.address.cep;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if cep is not a cep', () => {
        const input = generateValidInput();
        input.address.cep = '1234567890';

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if cep is not masked', () => {
        const input = generateValidInput();
        input.address.cep = '12345678';

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });
    });

    describe('street', () => {
      it('should return error if street is not present', () => {
        const input = generateValidInput();
        delete input.address.street;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if street is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            street: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });

    describe('city', () => {
      it('should return error if city is not present', () => {
        const input = generateValidInput();
        delete input.address.city;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if city is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            city: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });

    describe('number', () => {
      it('should return error if number is not present', () => {
        const input = generateValidInput();
        delete input.address.number;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if number is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            number: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });

    describe('state', () => {
      it('should return error if state is not present', () => {
        const input = generateValidInput();
        delete input.address.state;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if state is not a valid brazilian state', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            state: 'XX',
          },
        });

        expect(error).toBeDefined();
      });

      it('should return error if state is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            state: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });

    describe('neighborhood', () => {
      it('should return error if neighborhood is not present', () => {
        const input = generateValidInput();
        delete input.address.neighborhood;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeDefined();
      });

      it('should return error if neighborhood is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            neighborhood: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });

    describe('addressDetail', () => {
      it('should not return error if addressDetail is not present', () => {
        const input = generateValidInput();
        delete input.address.addressDetail;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeUndefined();
      });

      it('should not return error if addressDetail is an empty string', () => {
        const input = generateValidInput();
        input.address.addressDetail = '';

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeUndefined();
      });

      it('should not return error if addressDetail is null', () => {
        const input = generateValidInput();
        input.address.addressDetail = null;

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
        const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

        expect(error).toBeUndefined();
      });

      it('should return error if addressDetail is not a string', () => {
        const input = generateValidInput();

<<<<<<< HEAD
        const { error } = createOrUpdateEnrollmentSchema.validate({
=======
        const { error } = createEnrollmentSchema.validate({
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875
          ...input,
          address: {
            ...input.address,
            addressDetail: faker.datatype.number(),
          },
        });

        expect(error).toBeDefined();
      });
    });
  });

  it('should return no error if schema is valid', () => {
    const input = generateValidInput();

<<<<<<< HEAD
    const { error } = createOrUpdateEnrollmentSchema.validate(input);
=======
    const { error } = createEnrollmentSchema.validate(input);
>>>>>>> 72ab463d0e240c1b816829a0566b4e4b2b461875

    expect(error).toBeUndefined();
  });
});
