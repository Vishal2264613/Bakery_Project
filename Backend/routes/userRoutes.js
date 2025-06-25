const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController'); // Correctly import the controller

const { authenticateJWT } = require('../middleware/authenticate'); // Import the middleware

// Ensure this is correctly defined
router.get('/users', getUsers);

module.exports = router;
