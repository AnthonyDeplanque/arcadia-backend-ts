import Joi from 'joi';

export const postRaceValidationObject = {
  nom_commun: Joi.string().max(150).required(),
  nom_scientifique: Joi.string().max(150).required(),
  type_habitat: Joi.string().max(150).required(),
  famille: Joi.string().max(50),
  origine: Joi.string().max(150),
};

export const updateRaceValidationObject = {
  nom_commun: Joi.string().max(150),
  nom_scientifique: Joi.string().max(150),
  type_habitat: Joi.string().max(150),
  famille: Joi.string().max(50),
  origine: Joi.string().max(150),
};
