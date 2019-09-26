const { db } = require('../util/admin');
const slugify = require('slugify');

exports.getAllIngredients = (request, response) => {
    db
    .collection('ingredients')
    .orderBy('name')
    .get()
    .then(data => {
        let ingredients = []
        data.forEach(doc => {
            ingredients.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return response.json(ingredients);
    })
    .catch(err => {
        console.log(err)
    })
}

exports.createIngredient = (request, response) => {
    const newIngredient = {
        name: request.body.name
    }

    db
    .collection('ingredients')
    .doc(slugify(request.body.name.toLowerCase()))
    .set(newIngredient)
    .then(() => {
        response.json({ 
            message: 'Success'
        })
    })
    .catch((err) => {
        response.status(500).json({ 
            error: 'Could not create ingredient' 
        });
        console.log(err)
    })
}