import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required().description('Postgres connection string'),
    BASE_URL: Joi.string().required().description('Base URL of the backend'),
}).unknown().required();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    baseUrl: envVars.BASE_URL,
    postgres: {
        uri: envVars.DATABASE_URL,
    },

};

export default config;