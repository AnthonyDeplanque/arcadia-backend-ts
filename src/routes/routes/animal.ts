import { Router } from 'express';
import { postAnimalValidationObject, updateAnimalValidationObject } from '../../middlewares/animal';
import { getController, postController, updateController, deleteController } from '../../controllers/controller';

const table = 'ANIMAL';

const animalRoute = Router();

animalRoute.get('/', (req, res) => getController(req, res, table));
animalRoute.get('/:id', (req, res) => getController(req, res, table));
animalRoute.post('/', (req, res) => postController(req, res, table, postAnimalValidationObject));
animalRoute.put('/:id', (req, res) => updateController(req, res, table, updateAnimalValidationObject));
animalRoute.delete('/:id', (req, res) => deleteController(req, res, table));
