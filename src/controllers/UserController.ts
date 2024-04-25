import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../helpers/api-error';

export class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestError('The email provided is already in use.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      name,
      email,
      password: encryptedPassword,
    });
    await userRepository.save(newUser);

    const { password: _, ...registeredUser } = newUser;

    return res.status(201).json(registeredUser);
  }
}
