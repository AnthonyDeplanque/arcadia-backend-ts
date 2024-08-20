import { Router } from "express";
import { deleteController, getController, postController, updateController } from "../../controllers/controller";
import { postHabitatValidationObject, updateHabitatValidationObject } from "../../middlewares/habitat";

export const habitatRoute = Router();

const table = "HABITAT";

habitatRoute.get("/", (req, res) => getController(req, res, table));
habitatRoute.get("/:id", (req, res) => getController(req, res, table));
habitatRoute.post('/', (req, res) => postController(req, res, table, postHabitatValidationObject));
habitatRoute.put('/:id', (req, res) => updateController(req, res, table, updateHabitatValidationObject));
habitatRoute.delete('/:id', (req, res) => deleteController(req, res, table));