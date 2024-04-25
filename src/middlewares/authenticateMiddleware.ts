import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-error';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

const jwtSecret = process.env.JWT_PASSWORD as string;

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Not authorized.');
  }

  const [, token] = authorization.split(' ');
  const { id } = jwt.verify(token, jwtSecret) as { id: number };

  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new UnauthorizedError('Not authorized.');
  }

  next();
};
