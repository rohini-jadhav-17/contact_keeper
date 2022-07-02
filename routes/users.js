const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check, body } = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @acesss  Public
router.post('/', [
    check('name','Please add name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min:6 })
],
 async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: 'User already exists'})
        }
        //if new user, create user instance using User model
        user = new User({
            name,
            email,
            password
        });

        // encrypt pw using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        }
        // jwt token
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token});
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;