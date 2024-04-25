import { Request, Response } from 'express';
import { InvalidFormatError } from '../helpers/api-error';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_PASSWORD as string;

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new InvalidFormatError('Invalid email or password.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new InvalidFormatError('Invalid email or password.');
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    const { password: _, ...userData } = user;

    return res.json({
      user: userData,
      token,
    });
  }
}
