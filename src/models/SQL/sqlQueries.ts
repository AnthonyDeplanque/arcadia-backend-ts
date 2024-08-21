/* eslint-disable @typescript-eslint/no-explicit-any */

import { connection } from '../../db-config';


const db = connection.promise(); // Crée une instance de la connexion avec support des promesses

/**
 * Exécute une requête SQL pour insérer des données dans une table spécifique.
 * @param table - Le nom de la table dans laquelle insérer les données.
 * @param value - Les données à insérer (doivent correspondre à la structure de la table).
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const addQuery = (table: string, value: any): Promise<any> => {
  // Utilisation de la syntaxe `SET ?` pour les insertions avec MySQL
  return db.query(`INSERT INTO ${table} SET ?`, [value]);
};

/**
 * Exécute une requête SQL pour récupérer toutes les lignes d'une table spécifique.
 * @param table - Le nom de la table à interroger.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getQuery = (table: string): Promise<any> => {
  return db.query(`SELECT * FROM ${table}`);
};

/**
 * Exécute une requête SQL pour récupérer une ligne d'une table spécifique en fonction d'un ID.
 * @param table - Le nom de la table à interroger.
 * @param id - L'ID de la ligne à récupérer.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getOneQuery = (table: string, id: string): Promise<any> => {
  // Utilisation d'un paramètre dynamique pour l'ID
  return db.query(`SELECT * FROM ${table} WHERE ${table.toLowerCase()}_id = ?`, [id]);
};

/**
 * Exécute une requête SQL pour mettre à jour une ligne d'une table spécifique en fonction d'un ID.
 * @param table - Le nom de la table à mettre à jour.
 * @param id - L'ID de la ligne à mettre à jour.
 * @param values - Les nouvelles valeurs à mettre à jour (doivent correspondre à la structure de la table).
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const updateQuery = (table: string, id: string, values: any): Promise<any> => {
  return db.query(`UPDATE ${table} SET ? WHERE ${table.toLowerCase()}_id = ?`, [values, id]);
};

/**
 * Exécute une requête SQL pour supprimer une ligne d'une table spécifique en fonction d'un ID.
 * @param table - Le nom de la table à partir de laquelle supprimer les données.
 * @param id - L'ID de la ligne à supprimer.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const deleteQuery = (table: string, id: string): Promise<any> => {
  return db.query(`DELETE FROM ${table} WHERE ${table.toLowerCase()}_id = ?`, [id]);
};

// Requêtes spécifiques pour les utilisateurs

/**
 * Exécute une requête SQL pour récupérer un utilisateur par son nom d'utilisateur.
 * @param username - Le nom d'utilisateur de l'utilisateur à récupérer.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getOneUserByItsUsernameQuery = (username: string): Promise<any> => {
  return db.query(`SELECT * FROM UTILISATEUR WHERE username = ?`, [username]);
};

// Requêtes spécifiques aux tables de jonction

/**
 * Exécute une requête SQL pour récupérer les contenus associés à un animal par ID.
 * @param animalId - L'ID de l'animal dont on veut récupérer les contenus.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getContentByAnimalIdQuery = (animalId: string): Promise<any> => {
  return db.query(`
    SELECT * FROM contient 
    WHERE animal_id = ?
  `, [animalId]);
};

/**
 * Exécute une requête SQL pour récupérer les contenus associés à une image par ID.
 * @param imageId - L'ID de l'image dont on veut récupérer les contenus.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getContentByImageIdQuery = (imageId: string): Promise<any> => {
  return db.query(`
    SELECT * FROM contient
    WHERE image_id = ?
  `, [imageId]);
};

/**
 * Exécute une requête SQL pour supprimer des contenus associés à une image et un animal par leurs ID.
 * @param imageId - L'ID de l'image pour laquelle supprimer le contenu.
 * @param animalId - L'ID de l'animal pour lequel supprimer le contenu.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const deleteContentByItsIdsQuery = (imageId: string, animalId: string): Promise<any> => {
  return db.query(`
    DELETE FROM contient
    WHERE image_id = ? 
    AND animal_id = ?
    `, [imageId, animalId]);
};

/**
 * Exécute une requête SQL pour récupérer les enregistrements associés à un habitat par ID.
 * @param habitatId - L'ID de l'habitat dont on veut récupérer les enregistrements.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getInvolveByHabitatIdQuery = (habitatId: string): Promise<any> => {
  return db.query(`
    SELECT * FROM comporte
    WHERE habitat_id = ?
    `, [habitatId]);
};

/**
 * Exécute une requête SQL pour récupérer les enregistrements associés à une image par ID.
 * @param imageId - L'ID de l'image dont on veut récupérer les enregistrements.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const getInvolveByImageIdQuery = (imageId: string): Promise<any> => {
  return db.query(`
    SELECT * FROM comporte
    WHERE image_id = ?
    `, [imageId]);
};

/**
 * Exécute une requête SQL pour supprimer des enregistrements associés à une image et un habitat par leurs ID.
 * @param habitatId - L'ID de l'habitat pour lequel supprimer les enregistrements.
 * @param imageId - L'ID de l'image pour laquelle supprimer les enregistrements.
 * @returns Promise<any> - La promesse qui résout avec les résultats de la requête.
 */
export const deleteInvolveByItsIdsQuery = (habitatId: string, imageId: string): Promise<any> => {
  return db.query(`
    DELETE FROM comporte
    WHERE image_id = ?
    AND habitat_id = ?
    `, [imageId, habitatId]);
};