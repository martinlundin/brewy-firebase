const { db, admin } = require('../util/admin');

exports.createBrew = (request, response) => {
    const newBrew = {
        createdAt: new Date().toISOString(),
        createdBy: request.user.uid,
        name: (request.body.name ? request.body.name : ""),
        category: (request.body.category ? request.body.category : ""),
        date: (request.body.date ? request.body.date : new Date().toISOString()),
        pattern: (request.body.pattern ? request.body.pattern : ""),
        rating: null,
        ratings: {},
    }

    db
    .collection('brews')
    .add(newBrew)
    .then(ref => {
        return response.status(201).json({ message: `Created brew`, id: ref.id})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.updateBrew = (request, response) => {
    const brewDocument = db.collection('brews').doc(request.params.brewId)

    brewDocument.get()    
    .then(doc => {
        if(!doc.exists) return response.status(404).json({ error: {message: 'Brew not found'}})
        if(doc.data().createdBy !== request.user.uid) return response.status(403).json({ error: {message: 'User not allowed to access brew'}})
        
        const brew = {}
        brew.updatedAt = new Date().toISOString()
        if(request.body.name) brew.name = request.body.name
        if(request.body.category) brew.category = request.body.category
        if(request.body.date) brew.date = request.body.date

        return brewDocument.update(brew)
    })
    .then(() => {
        return response.json({ message: 'Updated brew'})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.setRating = (request, response) => {
    const brewId = request.params.brewId
    const thisRating = {}
    thisRating[`ratings.${request.user.uid}`] = Number(request.body.rating)

    const brewDocument = db.collection('brews').doc(brewId)

    //Todo validate so rating is between 1-10

    brewDocument
    .update(thisRating)
    .then(() => {
        return brewDocument.get()
    })
    .then((doc) => {
        const brew = doc.data()
        let totalRating = 0;
        Object.keys(brew.ratings).forEach(key => {
            totalRating += brew.ratings[key]
        })
        const newRating = {
            rating: totalRating/Object.keys(brew.ratings).length
        }
        return brewDocument.update(newRating)
    })
    .then(() => {
        return response.json({ message: `Rating set`})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.getBrew = (request, response) => {
    const brewId = request.params.brewId
    let brewData = {};

    db
    .collection('brews')
    .doc(brewId)
    .get()
    .then(doc => {
        if (!doc.exists) {
            return response.status(404).json({ error: { message: 'Brew not found' } })
        } 
        brewData = doc.data();
        brewData.brewId = doc.id;
        return db.collection('processes').where('brewId', '==', brewId).orderBy('startedAt', 'asc').get()
    })
    .then(data => {
        brewData.processes = [];
        data.forEach(doc => {
            brewData.processes.push({ ...doc.data(), processId: doc.id})
        })
        return response.json(brewData);
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.getBrews = (request, response) => {
    const limit = (request.query.limit ? Number(request.query.limit) : 10)
    const orderBy = (request.query.orderBy ? request.query.orderBy : 'rating')
    const sort = (request.query.sort ? request.query.sort : 'asc')

    db
    .collection('brews')
    .limit(limit)
    .orderBy(orderBy, sort)
    .get()
    .then(data => {
        let brews = []
        data.forEach(doc => {
            brews.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return response.json(brews);
    }) 
}