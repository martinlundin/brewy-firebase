const functions = require('firebase-functions');
const app = require('express')();
const { FBAuth } = require('./util/middleware')
const cors = require('cors');

const { register, login, updateUserData, getCurrentUserData } = require('./handlers/users')
const { createIngredient, getAllIngredients } = require('./handlers/ingredients')
const { createProcess, updateProcess, updateProcessIngredient, getProcess, getProcesses, deleteProcess } = require('./handlers/processes')
const { createBrew, updateBrew, setRating, getBrew, getBrews } = require('./handlers/brews')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// User routes
app.post('/register', register)
app.post('/login', login)
app.put('/user', FBAuth, updateUserData)
app.get('/user', FBAuth, getCurrentUserData)

// Ingredients routes
app.post('/ingredient', FBAuth, createIngredient);
app.get('/ingredients', getAllIngredients);

// Processes routes
app.post('/process', FBAuth, createProcess)
app.put('/process/:processId', FBAuth, updateProcess);
app.post('/process/:processId/ingredient/:action', FBAuth, updateProcessIngredient);
app.delete('/process/:processId', FBAuth, deleteProcess);
app.get('/process/:processId', getProcess);
app.get('/processes', getProcesses);

// Brew routes
app.post('/brew', FBAuth, createBrew);
app.put('/brew/:brewId', FBAuth, updateBrew);
app.post('/brew/:brewId/rating', FBAuth, setRating)
app.get('/brew/:brewId', getBrew);
app.get('/brews', getBrews);

exports.api = functions.region('europe-west1').https.onRequest(app);