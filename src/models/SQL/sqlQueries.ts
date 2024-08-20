import { connection } from "../../routes/db-config";
const db = connection.promise();

export const addQuery = (table: string, value: any): Promise<any> => {
  return db.query(`INSERT INTO ${table} SET ?`, [value]);
};

export const getQuery = (table: string): Promise<any> => {
  return db.query(`SELECT * FROM ${table}`);
};

export const getOneQuery = (table: string, id: string): Promise<any> => {
  return db.query(`SELECT * FROM ${table} WHERE ${table.toLocaleLowerCase()}_id = ? `, [id]);
};

export const updateQuery = (table: string, id: string, values: any): Promise<any> => {
  return db.query(`UPDATE ${table} SET ? WHERE ${table.toLocaleLowerCase()}_id = ?`, [values, id]);
};

export const deleteQuery = (table: string, id: string): Promise<any> => {
  return db.query(`DELETE FROM ${table} WHERE ${table.toLocaleLowerCase()}_id = ?`, [id]);
};

// User specific query 

export const getOneUserByItsUsernameQuery = (username: string): Promise<any> => {
  return db.query(`SELECT * FROM UTILISATEUR WHERE username = ?`, [username]);
};