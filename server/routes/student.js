'use strict';
const express = require('express');
const router = express.Router();
const {GetStudent,PostStudent} = require('../controller/studentController')

/* GET users listing. */
router.get('/', async function (req, res) {
    await GetStudent(req,res);
});
router.post('/', async function (req, res) {
   await PostStudent(req,res);
});
module.exports = router;
