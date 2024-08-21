// Importation des modules nécessaires
import dotenv from 'dotenv'; // Pour charger les variables d'environnement depuis un fichier .env
import express from 'express'; // Framework pour créer des applications web et des APIs
import cors from 'cors'; // Middleware pour gérer les requêtes Cross-Origin

import { router } from './routes'; // Importation des routes définies dans un autre fichier

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port sur lequel le serveur écoutera
const port: string | number = process.env.PORT || 1234;

// Middleware pour gérer le Cross-Origin Resource Sharing (CORS)
// Permet aux requêtes venant de différents domaines d'accéder aux ressources de l'API
app.use(cors());

// Middleware pour parser les requêtes entrantes avec le corps au format JSON
// Permet à Express de traiter les données envoyées dans les requêtes HTTP
app.use(express.json());

// Configuration des routes de l'application
// `router(app)` permet de définir les routes en passant l'application Express
router(app);

// Démarrage du serveur
// Le serveur écoute sur le port défini et affiche un message lorsque le serveur est prêt
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});