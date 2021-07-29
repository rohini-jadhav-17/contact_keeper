const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in  user
// @acesss  Private
router.get('/', (req,res) => {
    res.send('Get logged in  user');
});

// @route   POST api/auth
// @desc    Auth user & get tocken
// @acesss  Public
router.post('/', (req,res) => {
    res.send('Log in user');
});

module.exports = router;