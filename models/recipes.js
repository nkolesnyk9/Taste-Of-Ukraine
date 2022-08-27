const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema ({
    name: {type: String, required: true},
    description: String,
    image: String,
    ingredients: [String],
    directions: [String],
    category: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe