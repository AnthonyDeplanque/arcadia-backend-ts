import { Router } from 'express';
import {
  postRapportVeterinaireValidationObject,
  updateRapportVeterinaireValidationObject,
} from '../../middlewares/rapportVeterinaire';
import { getController, postController, updateController, deleteController } from '../../controllers/controller';
import { habitatRoute } from './habitat';

export const rapportVeterinaireRoute = Router();
const table = 'RAPPORT_VETERINAIRE';

habitatRoute.get('/', (req, res) => getController(req, res, table));
habitatRoute.get('/:id', (req, res) => getController(req, res, table));
habitatRoute.post('/', (req, res) => postController(req, res, table, postRapportVeterinaireValidationObject));
habitatRoute.put('/:id', (req, res) => updateController(req, res, table, updateRapportVeterinaireValidationObject));
habitatRoute.delete('/:id', (req, res) => deleteController(req, res, table));
