const router = require('express').Router();
const Recipe = require('../models/Recipe');
const cloudinary = require('../config/cloudinaryUpload');
const upload = require('../config/multerUpload');
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipe.controller');


// @GET /recipes
router.get('/', getAllRecipes);


// @GET /recipes:id
router.get('/:id', getRecipeById);


// @POST /add_recepy
router.post('/add', upload.single('image'), createRecipe);


// @PUT /update_recepy/:id
router.put('/update/:id', upload.single('image'), updateRecipe);

// @DELETE /delete/:id
router.delete('/delete/:id', deleteRecipe);

// @GET /reciapes/category/:category
router.get('/categories/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const recipesByCategory = await Recipe.find({ category: category });
        res.send(recipesByCategory);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;