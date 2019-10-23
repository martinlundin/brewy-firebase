const { db, admin } = require('../util/admin');

exports.createProcess = (request, response) => {
    const newProcess = {
        createdBy: request.user.uid,
        createdAt: new Date().toISOString(),
        brewId: request.body.brewId,
        type: request.body.type,
        startedAt: (request.body.startedAt ? request.body.startedAt : new Date().toISOString()),
        ingredients: (request.body.ingredients ? request.body.ingredients : []),
    }

    db
    .collection('processes')
    .add(newProcess)
    .then(ref => {
        return response.status(201).json({ message: `Created process`, id: ref.id})
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({ error })
    })
}

exports.updateProcess = (request, response) => {
    const processDocument = db.collection('processes').doc(request.params.processId)

    processDocument.get()    
    .then(doc => {
        if(!doc.exists) return response.status(404).json({ error: {message: 'Process not found'}})
        if(doc.data().createdBy !== request.user.uid) return response.status(403).json({ error: {message: 'User not allowed to access process'}})
        
        const process = {}
        process.updatedAt = new Date().toISOString()
        if(request.body.type) process.type = request.body.type
        if(request.body.startedAt) process.startedAt = request.body.startedAt
        if(request.body.endedAt) process.endedAt = request.body.endedAt

        return processDocument.update(process)
    })
    .then(() => {
        return response.json({ message: 'Updated process'})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.updateProcessIngredient = (request, response) => {
    const processDocument = db.collection('processes').doc(request.params.processId)
    const action = request.params.action

    const thisIngredient = {
        name: request.body.name,
        amount: request.body.amount,
        measurement: request.body.measurement,
    }

    processDocument.get()    
    .then(doc => {
        if(!doc.exists) return response.status(404).json({ error: {message: 'Process not found'}})
        if(doc.data().createdBy !== request.user.uid) return response.status(403).json({ error: {message: 'User not allowed to access process'}})
        
        const process = {
            ingredients: (action === "remove" ?  admin.firestore.FieldValue.arrayRemove(thisIngredient) : admin.firestore.FieldValue.arrayUnion(thisIngredient)),
            updatedAt: new Date().toISOString()
        }
        
        return processDocument.update(process)
    })
    .then(() => {
        return response.json({ message: 'Updated process ingredient'})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.getProcess = (request, response) => {
    const processId = request.params.processId
    db
    .collection('processes')
    .doc(processId)
    .get()
    .then(doc => {
        if (doc.exists) {
            return response.json({ ...doc.data(), processId: doc.id })
        } else {
            return response.status(404).json({ error: { message: 'No process with that id' } })
        }
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.getProcesses = (request, response) => {
    const limit = (request.query.limit ? Number(request.query.limit) : 10)
    const orderBy = (request.query.orderBy ? request.query.orderBy : 'startedAt')
    const sort = (request.query.sort ? request.query.sort : 'asc')
    const brewId = (request.query.brewId ? request.query.brewId : '')
    const type = (request.query.type ? request.query.type : '')

    let query = db
    .collection('processes')
    .limit(limit)
    .orderBy(orderBy, sort)

    query = (brewId ? query.where('brewId', '==', brewId) : query)
    query = (type ? query.where('type', '==', type) : query)

    query
    .get()
    .then(snapshot => {

        if (snapshot.empty) {
            return response.status(404).json({ error: { message: 'No process found' } })
        }
        let processes = [];
        snapshot.forEach(doc => {
            processes.push({
                processId: doc.id,
                ...doc.data()
            })
        });
        return response.json(processes)
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}

exports.deleteProcess = (request, response) => {
    const processDocument = db.collection('processes').doc(request.params.processId)

    processDocument.get()
    .then(doc => {
        if(!doc.exists) return response.status(404).json({ error: {message: 'Process not found'}})
        if(doc.data().createdBy !== request.user.uid) return response.status(403).json({ error: {message: 'User not allowed to access process'}})
        
        return processDocument.delete()
    })
    .then(() => {
        return response.json({ message: 'Process deleted'})
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}