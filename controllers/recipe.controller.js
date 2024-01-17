const Recipe = require('../models/Recipe');
const cloudinary = require('../config/cloudinaryUpload');
const upload = require('../config/multerUpload');



const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();

        if (recipes.length === 0) {
            res.status(200).send({
                message: "Database Empty"
            })
        }
        res.send(recipes);
    } catch (error) {
        res.status(500).send("Oops Something went wrong!")
        console.log(error);
    }
}



const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);

        // if request is good but there is no recipe with the provided id
        if (!recipe) {
            res.status(404).send({
                message: "Not Found"
            })
        }

        // otherwise return the recipe
        res.status(200).send(recipe);
    
    } catch(error) {
        console.log(error);
    }
}


const createRecipe = async (req, res) => {
    const { name, category, ingredients, popularity } = req.body;
    try {
        // upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)

        // define the new recipe  
        const recipe = new Recipe({
            name: name,
            category: category,
            ingredients: ingredients,
            popularity: popularity,
            imageUrl: result.url
        });

        await Recipe.create(recipe)

        res.status(200).send({
            message: "recipe created successfully"
        })
    } catch (error) {
        if (error?.code === 11000) res.status(400).send({
            message: "Recipe Name Already Exists"
        })
        console.log(error);
    }
}

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, category, ingredients, popularity } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path)
    const updateRecipe = {
        name: name,
        category: category,
        ingredients: ingredients,
        popularity: popularity,
        imageUrl: result.url
    }
    try {
        await Recipe.findByIdAndUpdate(id, updateRecipe);
        res.status(200).send({
            message: "updated recipe successfully"
        })
    } catch (error) {
        if (error?.code === 11000) res.status(400).send({
            message: "Recipe Name Already Exists"
        })
        console.log(error);
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).send({
            message: "recipe deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


const filterByCategory = async(req, res) => {
    const { category } = req.params;
    try {
        const recipesByCategory = await Recipe.find({ category: category });
        res.send(recipesByCategory);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    filterByCategory
};