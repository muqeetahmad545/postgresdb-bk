const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/authController');
const authenticateUser = require('../middleware/auth');


router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/',authenticateUser, getUsers);

module.exports = router;
