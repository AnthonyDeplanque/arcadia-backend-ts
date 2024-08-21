import { Router } from 'express';
import { deleteController, getController, postController, updateController } from '../../controllers/genericController';
import { postHabitatValidationObject, updateHabitatValidationObject } from '../../middlewares/habitat';
import { getInvolveByhabitatId } from '../../controllers/junctionController';

export const habitatRoute = Router();

const table = 'HABITAT';

habitatRoute.get('/', (req, res) => getController(req, res, table));
habitatRoute.get('/comporte/:id', (req, res) => getInvolveByhabitatId(req, res));
habitatRoute.get('/:id', (req, res) => getController(req, res, table));
habitatRoute.post('/', (req, res) => postController(req, res, table, postHabitatValidationObject));
habitatRoute.put('/:id', (req, res) => updateController(req, res, table, updateHabitatValidationObject));
habitatRoute.delete('/:id', (req, res) => deleteController(req, res, table));
