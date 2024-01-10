const router = require('express').Router();
const Recipe = require('./models/Recipe');
const cloudinary = require('./config/cloudinaryUpload');
const upload = require('./config/multerUpload');


// @GET /recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch (error) {
        console.log(error);
    }
})


// @GET /recipes:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        res.send(recipe);
    } catch (error) {
        console.log(error);
    }
})


// @POST /add_recepy
router.post('/add', upload.single('image'), async (req, res) => {
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
})


// @PUT /update_recepy/:id
router.put('/update/:id', upload.single('image'), async (req, res) => {
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
})

// @DELETE /delete/:id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Recipe.findByIdAndDelete(id);
        res.status(200).send({
            message: "recipe deleted successfully"
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }
})

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