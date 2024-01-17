const router = require('express').Router();
const { signup, login, getAllUsers } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');


// @POST /api/users
router.post('/', isUserDetailsAlreadyExist, signup);

// @POST /api/users/login
router.post('/login', login);

// @GET /api/users
router.get('/', getAllUsers);



module.exports = router;