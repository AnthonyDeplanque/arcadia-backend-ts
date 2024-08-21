import { Router } from 'express';
import { deleteController, getController, postController, updateController } from '../../controllers/controller';
import { postRaceValidationObject, updateRaceValidationObject } from '../../middlewares/race';

export const raceRoute = Router();

const table = 'RACE';

raceRoute.get('/', (req, res) => getController(req, res, table));
raceRoute.get('/:id', (req, res) => getController(req, res, table));
raceRoute.post('/', (req, res) => postController(req, res, table, postRaceValidationObject));
raceRoute.put('/:id', (req, res) => updateController(req, res, table, updateRaceValidationObject));
raceRoute.delete('/:id', (req, res) => deleteController(req, res, table));
