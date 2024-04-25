import { Router, Request, Response } from 'express';
import { UserController } from './controllers/UserController';
import { FilmController } from './controllers/FilmController';
import { LoginController } from './controllers/LoginController';
import { authenticateMiddleware } from './middlewares/authenticateMiddleware';

const routes = Router();

routes.get('/', async (req: Request, res: Response) => {
  return res.json('all very well');
});
routes.post('/users', new UserController().store);
routes.post('/login', new LoginController().login);

routes.use(authenticateMiddleware);

routes.post('/film', new FilmController().store);
routes.get('/film', new FilmController().index);
routes.get('/film/:id', new FilmController().show);
routes.put('/film/:id', new FilmController().update);
routes.delete('/film/:id', new FilmController().delete);

export default routes;
