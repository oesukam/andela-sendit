import { Joi } from 'celebrate';

const signup = {
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  password: Joi.string().min(6),
  email: Joi.string().email().required().trim(),
  gender: Joi.string().required().valid('Male', 'Female'),
  birth_date: Joi.date(),
  province: Joi.string().required().trim(),
  district: Joi.string().required().trim(),
  city: Joi.string().trim(),
  address: Joi.string().trim(),
};

const login = {
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required().trim(),
};

const updateUser = {
  first_name: Joi.string().trim(),
  last_name: Joi.string().trim(),
  birth_date: Joi.date(),
  province: Joi.string().trim(),
  district: Joi.string().trim(),
  city: Joi.string().trim(),
  address: Joi.string().trim(),
};

const userQueryParams = {
  page: Joi.number().min(1),
  search: Joi.string().trim().allow(''),
};

export default {
  login,
  signup,
  updateUser,
  userQueryParams,
};
