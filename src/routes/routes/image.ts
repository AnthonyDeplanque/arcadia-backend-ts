import { Router } from 'express';
import { deleteController, getController, postController, updateController } from '../../controllers/genericController';
import { postImageValidationObject, updateImageValidationObject } from '../../middlewares/image';
import { getContentByImageId, getInvolveByImageId } from '../../controllers/junctionController';

export const imageRoute = Router();

const table = 'IMAGE';

imageRoute.get('/', (req, res) => getController(req, res, table));
imageRoute.get('/contient/:id', (req, res) => getContentByImageId(req, res));
imageRoute.get('/comporte/:id', (req, res) => getInvolveByImageId(req, res));
imageRoute.get('/:id', (req, res) => getController(req, res, table));
imageRoute.post('/', (req, res) => postController(req, res, table, postImageValidationObject));
imageRoute.put('/:id', (req, res) => updateController(req, res, table, updateImageValidationObject));
imageRoute.delete('/:id', (req, res) => deleteController(req, res, table));
