const express = require('express');

const router = express.Router();
const todos = require('./todos');
const users = require('./users'); // Import the users router

router.use('/todos', todos);
router.use('/users', users); // Use the users router at the /users endpoint

module.exports = router;
