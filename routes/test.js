const express = require('express');
const router = express.Router;
const db = require('../db');
const uuid = require('uuid').v4;

//get all concerts
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

//get concert by ID