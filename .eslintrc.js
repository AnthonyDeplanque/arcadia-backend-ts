module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Permet d'utiliser les dernières fonctionnalités ECMAScript
    sourceType: 'module', // Permet l'utilisation des imports
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Assure-toi d'avoir cette ligne
  ],
  plugins: ['@typescript-eslint', 'prettier'], // Ajoute 'prettier' ici
  rules: {
    'prettier/prettier': 'error', // Fais en sorte que les erreurs de Prettier soient considérées comme des erreurs ESLint
    // Tu peux ajouter d'autres règles ici
  },
  rules: {
    // Ici, tu peux personnaliser les règles que tu veux appliquer ou désactiver
  },
};
