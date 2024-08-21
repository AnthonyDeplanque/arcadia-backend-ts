import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();
// creating connection pool for mysql
export const connection: mysql2.Pool = mysql2.createPool({
  host: process.env.DB_HOST,
  // '+' to fix variable to "number" type
  // '!' to tell Typescript this value can not be null or undefined
  port: +process.env.DB_PORT!,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
