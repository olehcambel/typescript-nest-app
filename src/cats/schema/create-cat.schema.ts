import * as Joi from 'joi';

export const createCatSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().min(0).max(100),
  breed: Joi.string(),
});
