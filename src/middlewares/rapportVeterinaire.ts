import Joi from 'joi';

export const postRapportVeterinaireValidationObject = {
  date_rapport: Joi.date().required(),
  etat: Joi.string().max(500),
  taille: Joi.number(),
  masse: Joi.number(),
  alimentation: Joi.string().max(50),
  nourriture: Joi.string().max(150),
  quantite: Joi.number().max(9999999999999.99),
  detail: Joi.string().max(500),
  utilisateur_id: Joi.number().required(),
  animal_id: Joi.number().required(),
};
export const updateRapportVeterinaireValidationObject = {
  date_rapport: Joi.date(),
  etat: Joi.string().max(500),
  taille: Joi.number(),
  masse: Joi.number(),
  alimentation: Joi.string().max(50),
  nourriture: Joi.string().max(150),
  quantite: Joi.number().max(9999999999999.99),
  detail: Joi.string().max(500),
  utilisateur_id: Joi.number(),
  animal_id: Joi.number(),
};
