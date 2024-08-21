import { Request, Response } from 'express'; // Import des types Request et Response de la bibliothèque Express pour le typage des requêtes et réponses HTTP
import { addQuery, deleteQuery, getOneQuery, getQuery, updateQuery } from '../models/SQL/sqlQueries'; // Import des fonctions pour interagir avec la base de données
import Joi from 'joi'; // Import de Joi pour la validation des données

// Variable générique pour définir une réponse "ok"
export const ok = true;

// Fonction générique pour gérer les erreurs
export const handleError = (res: Response, error: any, statusCode?: number) => {
  console.error(error); // Affiche l'erreur dans la console pour le débogage
  // Renvoie une réponse JSON avec un code d'état HTTP et un message d'erreur
  return res.status(statusCode ? statusCode : 500).json({ ok: !ok, error });
};

// Contrôleur pour les requêtes GET
export const getController = (req: Request, res: Response, table: string) => {
  const { id } = req.params; // Récupère l'ID de la requête si fourni dans l'URL

  // Vérifie si un ID est fourni. Si oui, on récupère un seul enregistrement, sinon on récupère tous les enregistrements
  const query = id ? getOneQuery(table, id) : getQuery(table);

  // Exécute la requête SQL
  return query
    .then(([results]) => {
      // Si un ID est fourni et qu'aucun résultat n'est trouvé
      if (id && !results.length) {
        return res.status(404).json({ ok: !ok, message: 'No record found' }); // Réponse avec un code d'état 404 et un message d'erreur
      }
      // Retourne les résultats au format JSON avec un statut "ok"
      return res.status(200).json({ ok, results });
    })
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle la fonction handleError
};

// Contrôleur générique pour les requêtes POST
export const postController = (req: Request, res: Response, table: string, joiSchema: any) => {
  const { body } = req; // Récupère le corps de la requête
  const { error } = Joi.object(joiSchema).validate(body, { abortEarly: false }); // Valide les données du corps de la requête selon le schéma Joi
  if (error) {
    // Si la validation échoue, retourne une réponse avec un code d'état 422 et les erreurs de validation
    return res.status(422).json({ ok: !ok, error });
  }

  // Exécute la requête pour ajouter un nouvel enregistrement dans la base de données
  addQuery(table, body)
    .then(([results]) => res.status(201).json({ ok, results })) // En cas de succès, retourne une réponse avec un code d'état 201 (créé) et les résultats
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle la fonction handleError
};

// Contrôleur pour les requêtes PUT (pour mettre à jour des enregistrements)
export const updateController = (req: Request, res: Response, table: string, joiSchema: any) => {
  const { body } = req; // Récupère le corps de la requête
  const { id } = req.params; // Récupère l'ID de la requête si fourni dans l'URL

  if (!id) {
    // Si aucun ID n'est fourni, retourne une réponse avec un code d'état 400 (mauvaise requête) et un message d'erreur
    return res.status(400).json({ ok: !ok, message: 'No ID provided' });
  }

  // Exécute une requête pour vérifier si l'enregistrement avec cet ID existe
  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        // Si aucun résultat n'est trouvé avec cet ID
        return res.status(404).json({ ok: !ok, message: 'No record found' }); // Retourne une réponse avec un code d'état 404 et un message d'erreur
      }

      // Valide les données du corps de la requête selon le schéma Joi
      const { error } = Joi.object(joiSchema).validate(body, {
        abortEarly: false,
      });
      if (error) {
        // Si la validation échoue, retourne une réponse avec un code d'état 422 et les erreurs de validation
        return res.status(422).json({ ok: !ok, error });
      }

      // Exécute la requête pour mettre à jour l'enregistrement dans la base de données
      return updateQuery(table, id, body);
    })
    .then(([results]) => res.status(200).json({ ok, results })) // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle la fonction handleError
};

// Contrôleur pour les requêtes DELETE
export const deleteController = (req: Request, res: Response, table: string) => {
  const { id } = req.params; // Récupère l'ID de la requête si fourni dans l'URL

  if (!id) {
    // Si aucun ID n'est fourni, retourne une réponse avec un code d'état 400 (mauvaise requête) et un message d'erreur
    return res.status(400).json({ ok: !ok, message: 'No ID provided' });
  }

  // Exécute une requête pour vérifier si l'enregistrement avec cet ID existe
  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        // Si aucun résultat n'est trouvé avec cet ID
        return res.status(404).json({ ok: !ok, message: 'No record found' }); // Retourne une réponse avec un code d'état 404 et un message d'erreur
      }

      // Exécute la requête pour supprimer l'enregistrement de la base de données
      return deleteQuery(table, id);
    })
    .then(([results]) => res.status(200).json({ ok, results })) // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
    .catch((error) => handleError(res, error)); // En cas d'erreur, appelle la fonction handleError
};