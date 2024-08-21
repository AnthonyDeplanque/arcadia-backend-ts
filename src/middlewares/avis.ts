import Joi from 'joi';

export const postAvisValidationObject = {
  pseudo: Joi.string().max(150).required(),
  commentaire: Joi.string().max(550).required(),
  is_visible: Joi.boolean(),
};

export const updateAvisValidationObject = {
  pseudo: Joi.string().max(150),
  commentaire: Joi.string().max(550),
  is_visible: Joi.boolean(),
};
