import { Request, Response } from 'express';
import { addQuery, deleteQuery, getOneQuery, getQuery, updateQuery } from '../models/SQL/sqlQueries';
import Joi from 'joi';

// generic variable to set an ok value
export const ok = true;

// generic error handler 
export const handleError = (res: Response, error: any, statusCode?: number) => {
  console.error(error);
  return res.status(statusCode ? statusCode : 500).json({ ok: !ok, error });
};

// get controller
export const getController = (req: Request, res: Response, table: string) => {
  const { id } = req.params;

  // check if an ID is provided or not.
  // If there is an ID, we get One record, else, we get all records
  const query = id ? getOneQuery(table, id) : getQuery(table);

  // launch SQL query and compute result
  return query
    .then(([results]) => {
      // If no result with an id
      if (id && !results.length) {
        return res.status(404).json({ ok: !ok, message: 'No record found' });
      }
      // Return result in json format, with ok
      return res.status(200).json({ ok, results });
    })
    .catch((error) => handleError(res, error));
};

export const postController = (req: Request, res: Response, table: string, joiSchema: any) => {
  const { body } = req;
  const { error } = Joi.object(joiSchema).validate(body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ ok: !ok, error });
  }

  addQuery(table, body)
    .then(([results]) => res.status(201).json({ ok, results }))
    .catch((error) => handleError(res, error));
};

export const updateController = (req: Request, res: Response, table: string, joiSchema: any) => {
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
    .then(([results]) => res.status(200).json({ ok, results }))
    .catch((error) => handleError(res, error));
};

export const deleteController = (req: Request, res: Response, table: string) => {
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
    .then(([results]) => res.status(200).json({ ok, results }))
    .catch((error) => handleError(res, error));
};
