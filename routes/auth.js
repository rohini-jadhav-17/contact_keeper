const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check, body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get logged in  user
// @acesss  Private
router.get('/', auth, async (req,res) => {
    try {
        // .select('-password) is to remove password in the user json
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user & get tocken
// @acesss  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
 async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne( { email });

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg : 'Invalid Credentials'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        // jwt token
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;