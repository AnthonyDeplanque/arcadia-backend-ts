import { Request, Response } from "express";
import argon2 from 'argon2';
import Joi from "joi";
import { loginUserValidationObject, postUserValidationObject, updateUserValidationObject } from "../middlewares/users";
import { addQuery, deleteQuery, getOneQuery, getOneUserByItsUsernameQuery, getQuery, updateQuery } from "../models/SQL/sqlQueries";
import { ok } from "./controller";

const table = "UTILISATEUR";

export const postUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  const { body } = req;
  const { username, nom, prenom, role_id, password } = body;
  if (!password) {
    return res.status(403).json({ ok: !ok, message: "No password provided" });
  }
  const hashed_password: string = await argon2.hash(password);


  const error: Joi.ValidationError | undefined = Joi.object(postUserValidationObject).validate({ username, hashed_password, nom, prenom, role_id }, { abortEarly: false }).error;
  if (error) {
    console.error(error);
    return res.status(422).json({ validationError: error.details });
  }

  getOneUserByItsUsernameQuery(username).then(([result]) => {
    if (result.length) {
      return res.status(403).json({ ok: !ok, message: "User already exist" });
    } else {
      addQuery(table, { username, hashed_password, nom, prenom, role_id }).then(([result]) => {
        return res.status(201).json({ ok, result });
      }).catch((error) => {
        return res.status(500).json({ ok: !ok, error });
      });
    }
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};

export const getUsers = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    getQuery(table).then(([results]) => {
      const resultsWithoutPassword = results.map((result: { utilisateur_id: string, username: string, role_id: number, nom: string, prenom: string, hashed_password: string; }) => { return { utilisateur_id: result.utilisateur_id, username: result.username, nom: result.nom, prenom: result.prenom, role_id: result.role_id }; });
      res.status(200).json({ ok, results: resultsWithoutPassword });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  } else {
    getOneQuery(table, id).then(([results]) => {
      const resultsWithoutPassword = results.map((result: { utilisateur_id: string, username: string, role_id: number, nom: string, prenom: string, hashed_password: string; }) => { return { utilisateur_id: result.utilisateur_id, username: result.username, nom: result.nom, prenom: result.prenom, role_id: result.role_id }; });
      res.status(200).json({ ok, results: resultsWithoutPassword });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  }
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(403).json({ ok: !ok, message: "No Id provided" });
  }
  getOneQuery(table, id).then(([results]) => {
    if (!results.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }

    const error: Joi.ValidationError | undefined = Joi.object(updateUserValidationObject).validate(req.body, { abortEarly: false }).error;
    if (error) {
      console.error(error);
      return res.status(422).json({ validationError: error.details });
    }
    updateQuery(table, id, req.body).then(([results]) => {
      return res.status(200).json({ ok, results });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};

// DELETE USER
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(403).json({ ok: !ok, message: "No Id provided" });
  }
  getOneQuery(table, id).then(([results]) => {
    if (!results.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    deleteQuery(table, id).then(([result]) => {
      return res.status(200).json({ ok, results });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};

// LOGIN USER
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const error = Joi.object(loginUserValidationObject).validate({ username, password }, { abortEarly: false }).error;

  if (error) {
    console.error(error);
    return res.status(422).json({ validationError: error.details });
  }
  getOneUserByItsUsernameQuery(username).then(async ([result]) => {
    if (!result.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    const { hashed_password } = result[0];
    const match = await argon2.verify(hashed_password, password);
    if (match) {
      const { nom, prenom, role_id } = result[0];
      return res.status(202).json({ ok, result: { nom, prenom, role_id } });
    }
    return res.status(403).json({ ok: !ok, message: "invalid password" });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};
