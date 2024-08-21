import { Application, Request, Response } from 'express';
import { userRoute } from './routes/users';
import { habitatRoute } from './routes/habitat';
import { serviceRoute } from './routes/service';
import { imageRoute } from './routes/image';
import { avisRoute } from './routes/avis';
import { raceRoute } from './routes/race';
import { teapot } from '../controllers/teapot';

const router = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello world' });
  });
  app.use('/users', userRoute);
  app.use('/habitat', habitatRoute);
  app.use('/service', serviceRoute);
  app.use('/image', imageRoute);
  app.use('/avis', avisRoute);
  app.use('/race', raceRoute);
  // app.use('/animal');
  app.get('/rapport_veterinaire', teapot);
};

export { router };
