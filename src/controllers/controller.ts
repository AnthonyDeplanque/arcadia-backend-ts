import { Request, Response } from 'express';
import {
  addQuery,
  deleteQuery,
  getOneQuery,
  getQuery,
  updateQuery,
} from '../models/SQL/sqlQueries';
import Joi from 'joi';

export const ok = true;

const handleError = (res: Response, error: any, statusCode?: number) => {
  console.error(error);
  return res.status(statusCode ? statusCode : 500).json({ ok: !ok, error });
};

export const getController = (req: Request, res: Response, table: string) => {
  const { id } = req.params;

  const query = id ? getOneQuery(table, id) : getQuery(table);

  query
    .then(([results]) => {
      if (id && !results.length) {
        return res.status(404).json({ ok: !ok, message: 'No record found' });
      }
      return res.status(200).json({ ok, results });
    })
    .catch((error) => handleError(res, error));
};

export const postController = (
  req: Request,
  res: Response,
  table: string,
  joiSchema: any
) => {
  const { body } = req;
  const { error } = Joi.object(joiSchema).validate(body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ ok: !ok, error });
  }

  addQuery(table, body)
    .then(([result]) => res.status(201).json({ ok, result, body }))
    .catch((error) => handleError(res, error));
};

export const updateController = (
  req: Request,
  res: Response,
  table: string,
  joiSchema: any
) => {
  const { body } = req;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ ok: !ok, message: 'No ID provided' });
  }

  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        return res.status(404).json({ ok: !ok, message: 'No record found' });
      }

      const { error } = Joi.object(joiSchema).validate(body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(422).json({ ok: !ok, error });
      }

      return updateQuery(table, id, body);
    })
    .then(([result]) => res.status(200).json({ ok, result }))
    .catch((error) => handleError(res, error));
};

export const deleteController = (
  req: Request,
  res: Response,
  table: string
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ ok: !ok, message: 'No ID provided' });
  }

  getOneQuery(table, id)
    .then(([results]) => {
      if (!results.length) {
        return res.status(404).json({ ok: !ok, message: 'No record found' });
      }

      return deleteQuery(table, id);
    })
    .then(([result]) => res.status(200).json({ ok, result }))
    .catch((error) => handleError(res, error));
};
