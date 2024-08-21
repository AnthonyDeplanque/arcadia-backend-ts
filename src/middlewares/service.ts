import Joi from 'joi';

export const postServiceValidationObject = {
  nom: Joi.string().max(50).required(),
  description: Joi.string().max(250),
};

export const updateServiceValidationObject = {
  nom: Joi.string().max(50),
  description: Joi.string().max(250),
};
