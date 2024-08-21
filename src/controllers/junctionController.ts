import { Request, Response } from "express";
import { handleError, ok } from "./genericController";
import { deleteContentByItsIdsQuery, deleteInvolveByItsIdsQuery, getContentByAnimalIdQuery, getContentByImageIdQuery, getInvolveByHabitatIdQuery, getInvolveByImageIdQuery } from "../models/SQL/sqlQueries";
import Joi from "joi";
import { postComporteValidationObject, postContientValidationObject } from "../middlewares/junction";

// Contrôleur pour obtenir le contenu associé à un animal par son ID
export const getContentByAnimalId = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID de l'animal depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni dans la requête, appelle handleError avec un message d'erreur
    return handleError(res, "NO ID");
  }

  // Exécute la requête pour obtenir le contenu associé à l'ID de l'animal
  return getContentByAnimalIdQuery(id)
    .then(([result]) => {
      // Vérifie si des résultats ont été trouvés
      if (result.length) {
        // Si aucun enregistrement n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: "no record" });
      }
      // Sinon, retourne les résultats avec un code d'état 200 (OK)
      return res.status(200).json({ ok, result });
    })
    .catch(error => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};

// Contrôleur pour obtenir le contenu associé à une image par son ID
export const getContentByImageId = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID de l'image depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni dans la requête, appelle handleError avec un message d'erreur
    return handleError(res, "NO ID");
  }

  // Exécute la requête pour obtenir le contenu associé à l'ID de l'image
  return getContentByImageIdQuery(id)
    .then(([result]) => {
      // Vérifie si des résultats ont été trouvés
      if (result.length) {
        // Si aucun enregistrement n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: "no record" });
      }
      // Sinon, retourne les résultats avec un code d'état 200 (OK)
      return res.status(200).json({ ok, result });
    })
    .catch(error => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};

// Contrôleur pour obtenir les enregistrements impliquant un habitat par son ID
export const getInvolveByHabitatId = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID de l'habitat depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni dans la requête, appelle handleError avec un message d'erreur
    return handleError(res, "NO ID");
  }

  // Exécute la requête pour obtenir les enregistrements impliquant l'ID de l'habitat
  return getInvolveByHabitatIdQuery(id)
    .then(([result]) => {
      // Vérifie si des résultats ont été trouvés
      if (result.length) {
        // Si aucun enregistrement n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: "no record" });
      }
      // Sinon, retourne les résultats avec un code d'état 200 (OK)
      return res.status(200).json({ ok, result });
    })
    .catch(error => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};

// Contrôleur pour obtenir les enregistrements impliquant une image par son ID
export const getInvolveByImageId = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID de l'image depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni dans la requête, appelle handleError avec un message d'erreur
    return handleError(res, "NO ID");
  }

  // Exécute la requête pour obtenir les enregistrements impliquant l'ID de l'image
  return getInvolveByImageIdQuery(id)
    .then(([result]) => {
      // Vérifie si des résultats ont été trouvés
      if (result.length) {
        // Si aucun enregistrement n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: "no record" });
      }
      // Sinon, retourne les résultats avec un code d'état 200 (OK)
      return res.status(200).json({ ok, result });
    })
    .catch(error => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};

// Contrôleur pour supprimer un contenu (relation entre image et animal)
export const deleteContent = (req: Request, res: Response) => {
  const { imageId, animalId } = req.body; // Récupère les IDs de l'image et de l'animal depuis le corps de la requête

  if (!imageId || !animalId) {
    // Si l'un ou l'autre des IDs est manquant, appelle handleError avec un message d'erreur
    return handleError(res, "missing imageId or animalId in body");
  }

  // Valide les données du corps de la requête selon le schéma Joi
  const error = Joi.object(postContientValidationObject)
    .validate(
      { image_id: imageId, animal_id: animalId },
      { abortEarly: false }
    ).error;

  if (error) {
    // Si la validation échoue, retourne une réponse avec un code d'état 422 (entité non traitable) et les erreurs de validation
    return res.status(422).json({ ok: !ok, error });
  }

  // Exécute la requête pour supprimer la relation entre l'image et l'animal dans la base de données
  return deleteContentByItsIdsQuery(imageId, animalId)
    .then(([result]) => res.status(200).json({ ok, result })) // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};

// Contrôleur pour supprimer une implication (relation entre habitat et image)
export const deleteInvolve = (req: Request, res: Response) => {
  const { imageId, habitatId } = req.body; // Récupère les IDs de l'image et de l'habitat depuis le corps de la requête

  if (!imageId || !habitatId) {
    // Si l'un ou l'autre des IDs est manquant, appelle handleError avec un message d'erreur
    return handleError(res, "missing imageId or habitatId in body");
  }

  // Valide les données du corps de la requête selon le schéma Joi
  const error = Joi.object(postComporteValidationObject)
    .validate(
      { image_id: imageId, habitat_id: habitatId },
      { abortEarly: false }
    ).error;

  if (error) {
    // Si la validation échoue, retourne une réponse avec un code d'état 422 (entité non traitable) et les erreurs de validation
    return res.status(422).json({ ok: !ok, error });
  }

  // Exécute la requête pour supprimer la relation entre l'image et l'habitat dans la base de données
  return deleteInvolveByItsIdsQuery(habitatId, imageId)
    .then(([result]) => res.status(200).json({ ok, result })) // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle handleError pour gérer l'erreur
};