const router = require('express').Router();
const upload = require('../config/multerUpload');
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, filterByCategory } = require('../controllers/recipe.controller');


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
router.get('/categories/:category', filterByCategory);




module.exports = router;