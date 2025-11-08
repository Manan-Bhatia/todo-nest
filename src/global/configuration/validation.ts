import * as Joi from 'joi';

const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});

// validate the schema against process.env
export const validateEnvironmentVariables = () => {
  const { error, value: validatedEnvVars } = validationSchema.validate(
    process.env,
    {
      abortEarly: true,
      allowUnknown: true,
    },
  );
  if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
  }
  return validatedEnvVars;
};
