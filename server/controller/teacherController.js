const db = require("../db/db");
async function GetTeacher(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'teacher') {
        res.send(JSON.stringify(await db.GetCourses()));
    }
    else{
        res.status(403).end();
    }
}
async function PostTeacher(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'teacher') {
        const { course } = req.body;
        const lessons = await db.GLBTC(course, user.id);
        res.send({ lessons: lessons[0]});
    }
    else{
        res.status(403).end();
    }
}
async function PostLesson(req,res){
    try{
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'teacher') {
        const { lessonid, number, group } = req.body;
        if(lessonid!==undefined && number!==undefined && group !== undefined){
            req.session.lessonid = lessonid;
            req.session.number = number;
            req.session.group = group;
        }
        const students = await db.GetStudentByGroup(req.session.group);
        const mag = await db.GetMagBySchedules(req.session.lessonid);
        const num = parseInt(req.session.number);
        res.send( { mags: mag, number: num, students: students});
    }
    else{
        res.status(403).end();
    }}
    catch (e){
        throw new Error(e);
    }
}
async function PostMag(req,res){
    try {
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'teacher') {
        const { student, rating, number,id } = req.body;
        if (id) {
            await db.UpdateMag(id, req.session.lessonid, student, number, rating)
        }
        else {
            await db.CreateMag(req.session.lessonid, student, number, rating);
        }
        await PostLesson(req,res);
        // res.redirect('/api/teacher/lesson')
    } else{
            res.status(403).end();
        }
    }catch (e) {
        throw new Error(e)
    }
}
module.exports = {
    GetTeacher,PostTeacher,PostLesson,PostMag
}