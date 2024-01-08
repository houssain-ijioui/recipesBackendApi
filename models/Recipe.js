const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
    }],
    popularity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});


const Recipe = mongoose.model("Recipe", recipeSchema);


module.exports = Recipe;