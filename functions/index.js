const functions = require('firebase-functions');
const app = require('express')();
const { getAllIngredients, createIngredient } = require('./handlers/ingredients')
const { register, login } = require('./handlers/users')
const { FBAuth } = require('./util/middleware')

// Ingredients routes
app.get('/ingredients', getAllIngredients);
app.post('/ingredient', FBAuth, createIngredient);

// User routes
app.post('/register', register)
app.post('/login', login)

exports.api = functions.region('europe-west1').https.onRequest(app);