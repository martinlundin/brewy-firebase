const firebase = require('firebase')
const { firebaseConfig } = require('../config')
firebase.initializeApp(firebaseConfig);

let token; 
exports.register = (request, response) => {
    const newUser = {...request.body};

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(idToken => {
        token = idToken;
        let user = firebase.auth().currentUser
        return user.updateProfile({
            displayName: newUser.displayName
        })
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

