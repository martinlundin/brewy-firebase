const functions = require('firebase-functions');
const app = require('express')();
const { getAllIngredients, createIngredient } = require('./handlers/ingredients')

// Ingredients routes
app.get('/ingredients', getAllIngredients);
app.post('/ingredient', createIngredient);

exports.api = functions.region('europe-west1').https.onRequest(app);