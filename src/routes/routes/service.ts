import { Router } from 'express';
import { getController, postController, updateController, deleteController } from '../../controllers/genericController';
import { postServiceValidationObject, updateServiceValidationObject } from '../../middlewares/service';

const table = 'SERVICE';

export const serviceRoute = Router();

serviceRoute.get('/', (req, res) => getController(req, res, table));
serviceRoute.get('/:id', (req, res) => getController(req, res, table));
serviceRoute.post('/', (req, res) => postController(req, res, table, postServiceValidationObject));
serviceRoute.put('/:id', (req, res) => updateController(req, res, table, updateServiceValidationObject));
serviceRoute.delete('/:id', (req, res) => deleteController(req, res, table));
