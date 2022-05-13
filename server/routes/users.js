'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db/db');


/* GET users listing. */
router.get('/', async function (req, res) {
        //
        // for (let k = 1; k < 5; k++) {
        //     await db.CreateCourse(k);
        // }
        // res.send('CREATE');
    // await db.CreateDay('Monday');
    // await db.CreateDay('Tuesday');
    // await db.CreateDay('Wednesday');
    // await db.CreateDay('Thursday');
    // await db.CreateDay('Friday');
    // await db.CreateDay('Saturday');
    // await db.CreateTime("9:35","10:55");
    // await db.CreateTime("11:25","12:45");
    // await db.CreateTime("13:00","14:20");
    // await db.CreateTime("14:40","16:00");
    //
    // res.send('CREATE');
});
router.post('/', async function (req, res) {
    const user = req.body;
    console.log(user);
    res.send(' ');
});

module.exports = router;
