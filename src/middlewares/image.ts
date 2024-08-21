import Joi from 'joi';

export const postImageValidationObject = {
  label: Joi.string().max(50).required(),
  image_url: Joi.string().max(500).required(),
};

export const updateImageValidationObject = {
  label: Joi.string().max(50),
  image_url: Joi.string().max(500),
};
