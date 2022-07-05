import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username || password) return res.status(200).json({ success: true });

  return res.status(200).json({ success: true });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username || password) return res.status(200).json({ success: true });

  return res.status(200).json({ success: true });
};
