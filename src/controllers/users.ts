import { Request, Response } from 'express';
import argon2 from 'argon2';
import Joi from 'joi';
import { loginUserValidationObject, postUserValidationObject, updateUserValidationObject } from '../middlewares/users';
import {
  addQuery,
  deleteQuery,
  getOneQuery,
  getOneUserByItsUsernameQuery,
  getQuery,
  updateQuery,
} from '../models/SQL/sqlQueries';
import { ok } from './genericController';

const table = 'UTILISATEUR'; // Nom de la table des utilisateurs dans la base de données

// Contrôleur pour ajouter un nouvel utilisateur
export const postUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  const { body } = req; // Récupère le corps de la requête
  const { username, nom, prenom, role_id, password } = body; // Déstructure les champs nécessaires du corps de la requête

  if (!password) {
    // Si aucun mot de passe n'est fourni, retourne une réponse avec un code d'état 403 (interdit) et un message d'erreur
    return res.status(403).json({ ok: !ok, message: 'No password provided' });
  }

  // Hache le mot de passe avec argon2
  const hashed_password: string = await argon2.hash(password);

  // Valide les données du corps de la requête selon le schéma Joi
  const error: Joi.ValidationError | undefined = Joi.object(postUserValidationObject).validate(
    { username, hashed_password, nom, prenom, role_id },
    { abortEarly: false }
  ).error;

  if (error) {
    // Si la validation échoue, retourne une réponse avec un code d'état 422 (entité non traitable) et les erreurs de validation
    console.error(error);
    return res.status(422).json({ validationError: error.details });
  }

  // Vérifie si un utilisateur avec le même nom d'utilisateur existe déjà
  getOneUserByItsUsernameQuery(username)
    .then(([result]) => {
      if (result.length) {
        // Si un utilisateur avec le même nom d'utilisateur existe déjà, retourne une réponse avec un code d'état 403 (interdit) et un message d'erreur
        return res.status(403).json({ ok: !ok, message: 'User already exist' });
      } else {
        // Sinon, ajoute le nouvel utilisateur à la base de données
        addQuery(table, { username, hashed_password, nom, prenom, role_id })
          .then(([results]) => {
            // En cas de succès, retourne une réponse avec un code d'état 201 (créé) et les résultats
            return res.status(201).json({ ok, results });
          })
          .catch((error) => {
            // En cas d'erreur, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
            return res.status(500).json({ ok: !ok, error });
          });
      }
    })
    .catch((error) => {
      // En cas d'erreur lors de la vérification de l'utilisateur, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
      return res.status(500).json({ ok: !ok, error });
    });
};

// Contrôleur pour obtenir la liste des utilisateurs ou un utilisateur spécifique par ID
export const getUsers = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni, récupère tous les utilisateurs
    getQuery(table)
      .then(([results]) => {
        // Supprime les mots de passe des résultats pour ne pas exposer cette information
        const resultsWithoutPassword = results.map(
          (result: {
            utilisateur_id: string;
            username: string;
            role_id: number;
            nom: string;
            prenom: string;
            hashed_password: string;
          }) => {
            return {
              utilisateur_id: result.utilisateur_id,
              username: result.username,
              nom: result.nom,
              prenom: result.prenom,
              role_id: result.role_id,
            };
          }
        );
        // Retourne les résultats avec un code d'état 200 (OK)
        res.status(200).json({ ok, results: resultsWithoutPassword });
      })
      .catch((error) => {
        // En cas d'erreur lors de la récupération des utilisateurs, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
        return res.status(500).json({ ok: !ok, error });
      });
  } else {
    // Si un ID est fourni, récupère l'utilisateur avec cet ID
    getOneQuery(table, id)
      .then(([results]) => {
        // Supprime les mots de passe des résultats pour ne pas exposer cette information
        const resultsWithoutPassword = results.map(
          (result: {
            utilisateur_id: string;
            username: string;
            role_id: number;
            nom: string;
            prenom: string;
            hashed_password: string;
          }) => {
            return {
              utilisateur_id: result.utilisateur_id,
              username: result.username,
              nom: result.nom,
              prenom: result.prenom,
              role_id: result.role_id,
            };
          }
        );
        // Retourne les résultats avec un code d'état 200 (OK)
        res.status(200).json({ ok, results: resultsWithoutPassword });
      })
      .catch((error) => {
        // En cas d'erreur lors de la récupération de l'utilisateur, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
        return res.status(500).json({ ok: !ok, error });
      });
  }
};

// Contrôleur pour mettre à jour un utilisateur existant
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni, retourne une réponse avec un code d'état 403 (interdit) et un message d'erreur
    return res.status(403).json({ ok: !ok, message: 'No Id provided' });
  }

  // Vérifie si l'utilisateur avec l'ID fourni existe
  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        // Si aucun utilisateur avec cet ID n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: 'no record' });
      }

      // Valide les données du corps de la requête selon le schéma Joi
      const error: Joi.ValidationError | undefined = Joi.object(updateUserValidationObject).validate(req.body, {
        abortEarly: false,
      }).error;

      if (error) {
        // Si la validation échoue, retourne une réponse avec un code d'état 422 (entité non traitable) et les erreurs de validation
        console.error(error);
        return res.status(422).json({ validationError: error.details });
      }

      // Met à jour les informations de l'utilisateur dans la base de données
      updateQuery(table, id, req.body)
        .then(([results]) => {
          // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
          return res.status(200).json({ ok, results });
        })
        .catch((error) => {
          // En cas d'erreur lors de la mise à jour, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
          return res.status(500).json({ ok: !ok, error });
        });
    })
    .catch((error) => {
      // En cas d'erreur lors de la vérification de l'utilisateur, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
      return res.status(500).json({ ok: !ok, error });
    });
};

// Contrôleur pour supprimer un utilisateur
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params; // Récupère l'ID depuis les paramètres de la requête

  if (!id) {
    // Si aucun ID n'est fourni, retourne une réponse avec un code d'état 403 (interdit) et un message d'erreur
    return res.status(403).json({ ok: !ok, message: 'No Id provided' });
  }

  // Vérifie si l'utilisateur avec l'ID fourni existe
  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        // Si aucun utilisateur avec cet ID n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: 'no record' });
      }

      // Supprime l'utilisateur de la base de données
      deleteQuery(table, id)
        .then(([results]) => {
          // En cas de succès, retourne une réponse avec un code d'état 200 (OK) et les résultats
          return res.status(200).json({ ok, results });
        })
        .catch((error) => {
          // En cas d'erreur lors de la suppression, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
          return res.status(500).json({ ok: !ok, error });
        });
    })
    .catch((error) => {
      // En cas d'erreur lors de la vérification de l'utilisateur, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
      return res.status(500).json({ ok: !ok, error });
    });
};

// Contrôleur pour connecter un utilisateur (login)
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body; // Récupère le nom d'utilisateur et le mot de passe depuis le corps de la requête

  // Valide les données du corps de la requête selon le schéma Joi
  const error = Joi.object(loginUserValidationObject).validate({ username, password }, { abortEarly: false }).error;

  if (error) {
    // Si la validation échoue, retourne une réponse avec un code d'état 422 (entité non traitable) et les erreurs de validation
    console.error(error);
    return res.status(422).json({ validationError: error.details });
  }

  // Vérifie si un utilisateur avec le nom d'utilisateur fourni existe
  getOneUserByItsUsernameQuery(username)
    .then(async ([result]) => {
      if (!result.length) {
        // Si aucun utilisateur avec ce nom d'utilisateur n'est trouvé, retourne une réponse avec un code d'état 404 (non trouvé) et un message d'erreur
        return res.status(404).json({ ok: !ok, message: 'no record' });
      }

      // Compare le mot de passe fourni avec le mot de passe haché stocké
      const { hashed_password } = result[0];
      const match = await argon2.verify(hashed_password, password);

      if (match) {
        // Si les mots de passe correspondent, retourne les détails de l'utilisateur avec un code d'état 202 (accepté)
        const { nom, prenom, role_id } = result[0];
        return res.status(202).json({ ok, results: [{ nom, prenom, role_id }] });
      }
      // Si les mots de passe ne correspondent pas, retourne une réponse avec un code d'état 403 (interdit) et un message d'erreur
      return res.status(403).json({ ok: !ok, message: 'invalid password' });
    })
    .catch((error) => {
      // En cas d'erreur lors de la connexion, retourne une réponse avec un code d'état 500 (erreur serveur) et les détails de l'erreur
      return res.status(500).json({ ok: !ok, error });
    });
};