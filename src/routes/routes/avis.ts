import { Router } from 'express';
import { deleteController, getController, postController, updateController } from '../../controllers/genericController';
import { postAvisValidationObject, updateAvisValidationObject } from '../../middlewares/avis';

export const avisRoute = Router();

const table = 'AVIS';

avisRoute.get('/', (req, res) => getController(req, res, table));
avisRoute.get('/:id', (req, res) => getController(req, res, table));
avisRoute.post('/', (req, res) => postController(req, res, table, postAvisValidationObject));
avisRoute.put('/:id', (req, res) => updateController(req, res, table, updateAvisValidationObject));
avisRoute.delete('/:id', (req, res) => deleteController(req, res, table));
