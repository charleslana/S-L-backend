import { celebrate, Joi, Segments } from 'celebrate';

export const validateUserCreate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().required().min(6).max(50),
        name: Joi.string()
          .pattern(new RegExp('^[a-zA-ZÀ-ú0-9_]*$'))
          .trim()
          .min(3)
          .max(20)
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateLogin = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateUserUpdate = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string()
          .pattern(new RegExp('^[a-zA-ZÀ-ú0-9_]*$'))
          .trim()
          .min(3)
          .max(20)
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const validateSetId = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
