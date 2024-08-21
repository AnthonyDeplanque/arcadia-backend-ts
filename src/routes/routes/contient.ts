import { Router } from "express";
import { getController, postController } from "../../controllers/genericController";
import { postContientValidationObject } from "../../middlewares/junction";
import { deleteContent } from "../../controllers/junctionController";

export const contientRoute = Router();

const table = "contient";

contientRoute.get('/', (req, res) => getController(req, res, table));
contientRoute.post('/', (req, res) => postController(req, res, table, postContientValidationObject));
contientRoute.delete('/', (req, res) => deleteContent(req, res));