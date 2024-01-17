const router = require('express').Router();
const { signup } = require('../controllers/auth.controller');



router.get('/signup', signup);



module.exports = router;