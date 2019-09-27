const { db } = require('../util/admin');

exports.createProcess = (request, response) => {
    const newProcess = {
        brewId: request.body.type,
        type: request.body.type,
        createdAt: new Date().toISOString(),
        startedAt: (request.body.startedAt ? request.body.startedAt : new Date().toISOString()),
        ingredients: request.body.ingredients,
    }

    db
    .collection('processes')
    .add(newProcess)
    .then(data => {
        return response.status(201).json({ message: `Created process ${data.id}`})
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({ error })
    })
}

exports.updateProcess = (request, response) => {
    const processId = request.params.processId;
    const process = {}

    process.updatedAt = new Date().toISOString()
    if(request.body.type) process.type = request.body.type
    if(request.body.startedAt) process.startedAt = request.body.startedAt
    if(request.body.endedAt) process.endedAt = request.body.endedAt
    if(request.body.ingredients) process.ingredients = request.body.ingredients

    db
    .collection('processes')
    .doc(processId)
    .update(process)
    .then(data => {
        return response.status(201).json({ message: 'Updated process'})
    })
    .catch(error => {
        console.error(error);
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
            return response.json({ ...doc.data() })
        } else {
            return response.status(404).json({ error: { message: 'No process with that id' } })
        }
    })
    .catch(error => {
        console.error(error)
        return response.status(500).json({ error })
    })
}