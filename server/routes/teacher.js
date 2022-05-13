'use strict';
const express = require('express');
const router = express.Router();
const {GetTeacher,PostTeacher,PostLesson,PostMag} = require("../controller/teacherController");



router.get('/', async function (req, res) {
    await GetTeacher(req,res)
});
router.post('/', async function (req, res) {
       await PostTeacher(req, res);
});
router.post('/lesson', async function (req, res) {
    await PostLesson(req,res);
});
router.post('/lessons', async function (req, res) {
        await PostMag(req,res);
});
module.exports = router;
