import { config } from 'dotenv';

config();

export const development = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DRIVER,
  logging: false,
};
export const test = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DRIVER,
  logging: false,
};
export const production = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DRIVER,
  logging: false,
};
