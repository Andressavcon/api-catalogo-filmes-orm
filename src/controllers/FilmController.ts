import { Request, Response } from 'express';
import { filmRepository } from '../repositories/filmRepository';
import { BadRequestError, NotFoundError } from '../helpers/api-error';

export class FilmController {
  async store(req: Request, res: Response) {
    const { title, gender, synopsis } = req.body;

    const existingFilm = await filmRepository.findOne({ where: { title } });
    if (existingFilm) {
      throw new BadRequestError('The film is already registered.');
    }

    const newFilm = filmRepository.create({
      title,
      gender,
      synopsis,
    });
    await filmRepository.save(newFilm);

    return res.status(201).json(newFilm);
  }
  async index(req: Request, res: Response) {
    const filmCatalog = await filmRepository.find();
    return res.json(filmCatalog);
  }
  async show(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const singleFilm = await filmRepository.findOne({ where: { id } });

    if (!singleFilm) {
      throw new NotFoundError('Film not found.');
    }

    return res.json(singleFilm);
  }
  async update(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const { title, gender, synopsis } = req.body;

    const filmToUpdate = await filmRepository.findOne({ where: { id } });

    if (!filmToUpdate) {
      throw new NotFoundError('Film not found.');
    }

    const existingFilm = await filmRepository.findOne({ where: { title } });
    if (existingFilm) {
      throw new BadRequestError('Film already registered.');
    }

    filmToUpdate.title = title;
    filmToUpdate.gender = gender;
    filmToUpdate.synopsis = synopsis;

    await filmRepository.save(filmToUpdate);

    return res.status(204).send();
  }
  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const filmToDelete = await filmRepository.findOne({ where: { id } });

    if (!filmToDelete) {
      throw new NotFoundError('Film not found.');
    }

    await filmRepository.delete(id);

    return res.status(204).send();
  }
}
