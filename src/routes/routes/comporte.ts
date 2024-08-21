import { Router } from "express";
import { getController, postController } from "../../controllers/genericController";
import { postComporteValidationObject } from "../../middlewares/junction";
import { deleteInvolve } from "../../controllers/junctionController";

export const comporteRoute = Router();

const table = "comporte";

comporteRoute.get('/', (req, res) => getController(req, res, table));
comporteRoute.post('/', (req, res) => postController(req, res, table, postComporteValidationObject));
comporteRoute.delete('/', (req, res) => deleteInvolve(req, res));