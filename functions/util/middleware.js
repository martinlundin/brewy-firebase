const { admin, db } = require('./admin');

module.exports.FBAuth = (request, response, next) => {
    let idToken;
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found in request header')
        return response.status(403).json({ error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        request.user = decodedToken;
        return db.collection('users')
        .where('userId', "==", request.user.uid)
        .limit(1)
        .get()
    })
    .then((data) => {
        request.user.profile = data.docs[0].data()
        return next()
    })
    .catch(error => {
        console.error(error);
        return response.status(403).json({ error })
    })
}