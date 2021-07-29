const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @acesss  Private
router.get('/', (req,res) => {
    res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add a new contact
// @acesss  Private
router.post('/', (req,res) => {
    res.send('Add contact');
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @acesss  Private
router.put('/:id', (req,res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @acesss  Private
router.put('/:id', (req,res) => {
    res.send('Delete contact');
});

module.exports = router;