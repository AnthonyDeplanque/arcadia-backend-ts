import { Request, Response } from "express";
import { addQuery, deleteQuery, getOneQuery, getQuery, updateQuery } from "../models/SQL/sqlQueries";
import Joi from "joi";

export const ok = true;

export const getController = (req: Request, res: Response, table: string) => {
  const { id } = req.params;

  if (!id) {
    getQuery(table)
      .then(([results]) => {
        return res.status(200).json({ ok, results });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ ok: !ok, error });
      });
  } else {

    getOneQuery(table, id)
      .then(([results]) => {
        if (!results.length) {
          return res.status(404).json({ ok: !ok, message: "no record" });
        }
        return res.status(200).json({ ok, results });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ ok: !ok, error });
      });
  }
};

export const postController = (req: Request, res: Response, table: string, joiMiddleware: any) => {
  const { body } = req;
  const error = Joi.object(joiMiddleware).validate(body, { abortEarly: false }).error;
  if (error) {
    return res.status(403).json({ ok: !ok, error });
  }
  addQuery(table, body).then(([result]) => {
    return res.status(201).json({ ok, result, body });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};

export const updateController = (req: Request, res: Response, table: string, joiMiddleware: any) => {
  const { body } = req;
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ ok: !ok, message: "no id provided" });
  };
  getOneQuery(table, id).then(([results]) => {
    if (!results.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    const error = Joi.object(joiMiddleware).validate(body, { abortEarly: false }).error;
    if (error) {
      return res.status(422).json({ ok: !ok, error });
    }
    updateQuery(table, id, body).then(([result]) => {
      return res.status(200).json({ ok, result });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });;
};

export const deleteController = (req: Request, res: Response, table: string) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ ok: !ok, message: "no id provided" });
  };
  getOneQuery(table, id).then(([results]) => {
    if (!results.length) {
      return res.status(404).json({ ok: !ok, message: "no record" });
    }
    deleteQuery(table, id).then(([result]) => {
      return res.status(201).json({ ok, result });
    }).catch((error) => {
      return res.status(500).json({ ok: !ok, error });
    });
  }).catch((error) => {
    return res.status(500).json({ ok: !ok, error });
  });
};