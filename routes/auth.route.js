const router = require('express').Router();
const { signup } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');



router.post('/signup', isUserDetailsAlreadyExist, signup);



module.exports = router;