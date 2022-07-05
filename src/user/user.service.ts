import { User } from '@prisma/client';
import { hash } from 'argon2';
import omitPassword from '../utils/omitPassword';
import prisma from '../utils/prisma';

export const createUser = async (input: User) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...input,
        password: await hash(input.password),
      },
    });
    const userWithoutPassword = omitPassword(user);

    return userWithoutPassword;
  } catch (error) {
    throw new Error(error);
  }
};
