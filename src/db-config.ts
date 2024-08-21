// Importation des modules nécessaires
import dotenv from 'dotenv'; // Pour charger les variables d'environnement depuis un fichier .env
import mysql2 from 'mysql2'; // Module pour interagir avec une base de données MySQL

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Création d'une connexion à la base de données MySQL en utilisant un pool de connexions
export const connection: mysql2.Pool = mysql2.createPool({
  // Adresse du serveur de base de données, récupérée depuis les variables d'environnement
  host: process.env.DB_HOST,

  // Port du serveur de base de données
  // Le signe '+' convertit la valeur de type string à number
  // Le '!' indique à TypeScript que la valeur ne sera pas null ou undefined
  port: +process.env.DB_PORT!,

  // Nom d'utilisateur pour se connecter à la base de données
  user: process.env.DB_USER,

  // Mot de passe pour se connecter à la base de données
  password: process.env.DB_PASSWORD,

  // Nom de la base de données à utiliser
  database: process.env.DB_NAME,
});