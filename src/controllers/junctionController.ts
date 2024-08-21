import { Request, Response } from "express";
import { handleError, ok } from "./genericController";
import { deleteContentByItsIdsQuery, deleteInvolveByItsIdsQuery, getContentByAnimalIdQuery, getContentByImageIdQuery, getInvolveByHabitatIdQuery, getInvolveByImageIdQuery } from "../models/SQL/sqlQueries";
import Joi from "joi";
import { postComporteValidationObject, postContientValidationObject } from "../middlewares/junction";

export const getContentByAnimalId = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return handleError(res, "NO ID");
  }
  return getContentByAnimalIdQuery(id).then(([result]) => {
    if (result.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    return res.status(200).json({ ok, result });
  }).catch(error => handleError(res, error));
};

export const getContentByImageId = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return handleError(res, "NO ID");
  }
  return getContentByImageIdQuery(id).then(([result]) => {
    if (result.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    return res.status(200).json({ ok, result });
  }).catch(error => handleError(res, error));
};

export const getInvolveByhabitatId = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return handleError(res, "NO ID");
  }
  return getInvolveByHabitatIdQuery(id).then(([result]) => {
    if (result.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    return res.status(200).json({ ok, result });
  }).catch(error => handleError(res, error));
};

export const getInvolveByImageId = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return handleError(res, "NO ID");
  }
  return getInvolveByImageIdQuery(id).then(([result]) => {
    if (result.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    return res.status(200).json({ ok, result });
  }).catch(error => handleError(res, error));
};

export const deleteContent = (req: Request, res: Response) => {
  const { imageId, animalId } = req.body;
  if (!imageId || !animalId) {
    handleError(res, "missing imageId or animalId in body");
  }

  const error = Joi.object(postContientValidationObject)
    .validate(
      { image_id: imageId, animal_id: animalId },
      { abortEarly: false }
    ).error;

  if (error) {
    res.status(422).json({ ok: !ok, error });
  }
  return deleteContentByItsIdsQuery(imageId, animalId)
    .then(([result]) => res.status(200).json({ ok, result }))
    .catch((error) => handleError(res, error));

};

export const deleteInvolve = (req: Request, res: Response) => {
  const { imageId, animalId: habitatId } = req.body;
  if (!imageId || !habitatId) {
    handleError(res, "missing imageId or habitatId in body");
  }

  const error = Joi.object(postComporteValidationObject)
    .validate(
      { image_id: imageId, habitat_id: habitatId },
      { abortEarly: false }
    ).error;

  if (error) {
    res.status(422).json({ ok: !ok, error });
  }
  return deleteInvolveByItsIdsQuery(habitatId, imageId)
    .then(([result]) => res.status(200).json({ ok, result }))
    .catch((error) => handleError(res, error));
};