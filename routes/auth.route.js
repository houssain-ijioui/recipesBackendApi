const router = require('express').Router();
const { signup } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');
const User = require('../models/User');



router.post('/', isUserDetailsAlreadyExist, signup);


router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users)
})



module.exports = router;