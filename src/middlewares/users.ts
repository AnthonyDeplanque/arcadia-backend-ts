import Joi from 'joi';

export const postUserValidationObject = {
  username: Joi.string().max(150).required(),
  hashed_password: Joi.string().max(150).required(),
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(50).required(),
  role_id: Joi.number().required(),
};

export const updateUserValidationObject = {
  nom: Joi.string().max(50),
  prenom: Joi.string().max(50),
  role_id: Joi.number(),
};

export const loginUserValidationObject = {
  username: Joi.string().max(150).required(),
  password: Joi.string().max(150).required(),
};
