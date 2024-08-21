import Joi from 'joi';

export const postAnimalValidationObject = {
  prenom: Joi.string().max(150).required(),
  habitat_id: Joi.number().required(),
  race_id: Joi.number().required(),
};

export const updateAnimalValidationObject = {
  prenom: Joi.string().max(150).required(),
  habitat_id: Joi.number().required(),
  race_id: Joi.number().required(),
};
