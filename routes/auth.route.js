const router = require('express').Router();
const { signup, login } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');
const User = require('../models/User');


// @POST /api/auth
router.post('/', isUserDetailsAlreadyExist, signup);

// @POST /api/auth
router.post('/login', login);

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users)
})



module.exports = router;