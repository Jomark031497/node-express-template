import { hash } from 'argon2';
import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { Error } from './user.types';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const errors: Error = {};

  const usernameExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usernameExists) errors.username = 'Username is already taken';
  if (emailExists) errors.email = 'Username is already taken';

  if (Object.keys(errors).length) return res.status(400).json(errors);

  // continue

  const user = await prisma.user.create({
    data: {
      ...req.body,
      password: await hash(password),
    },
  });

  return res.status(200).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username || password) return res.status(200).json({ success: true });

  return res.status(200).json({ success: true });
};
