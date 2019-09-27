const functions = require('firebase-functions');
const app = require('express')();
const { FBAuth } = require('./util/middleware')

const { register, login } = require('./handlers/users')
const { createIngredient, getAllIngredients } = require('./handlers/ingredients')
const { createProcess, updateProcess, getProcess } = require('./handlers/processes')
const { createBrew, updateBrew, setRating, getBrew, getBrews } = require('./handlers/brews')

// User routes
app.post('/register', register)
app.post('/login', login)

// Ingredients routes
app.post('/ingredient', FBAuth, createIngredient);
app.get('/ingredients', getAllIngredients);

// Processes routes
app.post('/process', FBAuth, createProcess)
app.put('/process/:processId', updateProcess);
app.get('/process/:processId', getProcess);

// Brew routes
app.post('/brew', FBAuth, createBrew);
app.put('/brew/:brewId', updateBrew);
app.get('/brew/:brewId', getBrew);
app.get('/brews', getBrews);

exports.api = functions.region('europe-west1').https.onRequest(app);