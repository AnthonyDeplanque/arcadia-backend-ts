const Joi = require('joi');

export const postHabitatValidationObject = {
  nom: Joi.string().max(150).required(),
  description: Joi.string().max(500).required(),
  commentaire_habitat: Joi.string().max(500),
};

export const updateHabitatValidationObject = {
  nom: Joi.string().max(150),
  description: Joi.string().max(500),
  commentaire_habitat: Joi.string().max(500),
};