'use strict';
const express = require('express');
const router = express.Router();
const {GetTeacher,PostTeacher,GetLessons,PostLessons,GetSchedule,PostSchedule,GetStudents,PostStudent,GetGroups,PostGroup,
    DeleteTeacher,DeleteLesson,DeleteGroup,DeleteSchedule, DeleteStudent,GetGroupStudent,GetStudentLesson,
    PostDateTime,GetDateTime} = require("../controller/adminController");



router.get('/teacher', async function (req, res) {
    await GetTeacher(req, res);});
router.post('/teacher', async function (req, res) {
    await PostTeacher(req,res);});
router.get('/lesson', async function (req, res) {
    await GetLessons(req,res)});
router.post('/lesson', async function (req, res) {
    await PostLessons(req,res);
});
router.get('/schedule', async function (req, res) {
    await GetSchedule(req,res);
});
router.post('/schedule', async function (req, res) {
    await PostSchedule(req,res);
});
router.get('/student', async function (req, res) {
    await GetStudents(req,res);
});
router.get('/student/:id', async function (req, res) {
    await GetStudentLesson(req,res);
});
router.post('/student', async function (req, res) {
    await PostStudent(req,res);
});
router.get('/group',async function (req,res){
    await GetGroups(req,res);
});
router.post('/group',async function(req,res){
    await PostGroup(req,res);
});
router.get('/group/:id/students',async function(req,res){
    await GetGroupStudent(req,res);
});
router.delete('/teacher/:id',async function (req,res){
    await DeleteTeacher(req,res);
});
router.delete('/student/:id',async function (req,res){
    await DeleteStudent(req,res);
});
router.delete('/lesson/:id',async function (req,res){
    await DeleteLesson(req,res);
});
router.delete('/group/:id',async function (req,res){
    await DeleteGroup(req,res);
});
router.delete('/schedule/:id/:dtid',async function (req,res){
    await DeleteSchedule(req,res);
});
router.post('/schedule/:id/datetime',async function (req,res){
    await PostDateTime(req,res);
});
router.get('/datetime/:gid/:tid',async function (req,res){
    await GetDateTime(req,res);
});
module.exports = router;
