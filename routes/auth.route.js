const router = require('express').Router();
const { signup, login, getAllUsers, logout } = require('../controllers/auth.controller');
const isUserDetailsAlreadyExist = require('../middlewares/isUserDetailsAlreadyExist');
const verifyToken = require('../middlewares/authMiddlware');

/**
 * @openapi
 * paths:
 *   '/api/users/signup':
 *     post:
 *       tags:
 *         - User Controller
 *       summary: Create a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   default: johndoe 
 *                 email:
 *                   type: string
 *                   default: johndoe@mail.com
 *                 password:
 *                   type: string
 *                   default: johnDoe20!@
 *       responses:
 *         201:
 *           description: Created
 *         409:
 *           description: Validation Failed
 *         404:
 *           description: Not Found
 *         500:
 *           description: Server Error
 */
router.post('/signup', isUserDetailsAlreadyExist, signup);

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Logged In
 *      400:
 *        description: Validation Failed
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post('/login', login);

/**
 * @openapi
 * '/api/users/logout':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Log user out
 *     responses:
 *      200:
 *        description: Logged out Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get('/logout', logout);

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get all users
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get('/', verifyToken, getAllUsers);

module.exports = router;
