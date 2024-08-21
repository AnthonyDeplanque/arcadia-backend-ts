import { Router } from 'express';
import { deleteController, getController, postController, updateController } from '../../controllers/controller';
import { postImageValidationObject, updateImageValidationObject } from '../../middlewares/image';

export const imageRoute = Router();

const table = 'IMAGE';

imageRoute.get('/', (req, res) => getController(req, res, table));
imageRoute.get('/:id', (req, res) => getController(req, res, table));
imageRoute.post('/', (req, res) => postController(req, res, table, postImageValidationObject));
imageRoute.put('/:id', (req, res) => updateController(req, res, table, updateImageValidationObject));
imageRoute.delete('/:id', (req, res) => deleteController(req, res, table));
