const firebase = require('firebase');
const { db } = require('../util/admin');
const { firebaseConfig } = require('../config');
firebase.initializeApp(firebaseConfig);

let token, userId; 
exports.register = (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
    };
    if(!request.body.displayName){
        return response.status(404).json({ message: "Enter name" })
    }

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken(true);
    })
    .then(idToken => {
        token = idToken;
        const userProfile = {
            email: request.body.email,
            displayName: request.body.displayName,
            createdAt: new Date().toISOString(),
            userId
        }
        return db.collection('users').doc(newUser.email).set(userProfile)
    })
    .then(() => {
        return response.status(201).json({ token })
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error });
    });
}

exports.login = (request, response) => {
    const user = {...request.body}

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return response.json({ token })
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.updateUserData = (request, response) => {
    let userData = {
        displayName: request.body.displayName,
    }

    db.collection('users').doc(request.user.email).update(userData)
    .then(() => {
        return response.json({ message: 'Updated user data' })
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.getCurrentUserData = (request, response) => {
    db.collection('users').doc(request.user.email).get()
    .then((doc) => {
        if(doc.exists){
            data = doc.data()
            return response.json({ data })
        } else {
            return response.status(404).json({ error: {message: 'User not found'} })
        }
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}