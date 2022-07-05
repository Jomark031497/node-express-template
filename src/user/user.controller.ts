import { Request, Response } from 'express';
import { userService } from '.';
import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { Error } from './user.types';

export const signUp = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const errors: Error = {};

  const usernameExists = await prisma.user.findUnique({
    where: { username },
  });

  const emailExists = await prisma.user.findUnique({
    where: { email },
  });

  if (usernameExists) errors.username = 'Username is already taken';
  if (emailExists) errors.email = 'Username is already taken';
  if (Object.keys(errors).length) return res.status(400).json(errors);

  try {
    const user = await userService.createUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username || password) return res.status(200).json({ success: true });

  return res.status(200).json({ success: true });
};
