const router = require('express').Router();
const { signup, login, getAllUsers, logout } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');
const verifyToken = require('../middlewares/authMiddlware');


// @POST /api/users
router.post('/signup', isUserDetailsAlreadyExist, signup);

// @POST /api/users/login
router.post('/login', login);

// @GET /api/users/logout
router.get('/logout', logout); 

// @GET /api/users
router.get('/', verifyToken, getAllUsers);



module.exports = router;