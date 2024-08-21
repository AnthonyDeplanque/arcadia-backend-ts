import Joi from "joi";

export const postContientValidationObject = {
  animal_id: Joi.number().required(),
  image_id: Joi.number().required()
};

export const postComporteValidationObject = {
  habitat_id: Joi.number().required(),
  image_id: Joi.number().required()
};