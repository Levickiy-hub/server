const db = require("../db/db");

async function GetStudent(req,res){
 let user = (req.session.passport != undefined) ? req.session.passport.user : null;
    if (user && user.role === 'student') {
     const lessons = await db.GetLessonsBySubgroup(user.subgroup);
                console.log(lessons[0]);
                res.send( lessons[0]);
    }
    else{
          res.status(403).end();
        }
}
async function PostStudent(req,res){
 let user = (req.session.passport != undefined) ? req.session.passport.user : null;
    if (user && user.role === 'student') {
     const { schedule, lessonid } = req.body;
                const les = await db.GetLessonsById(lessonid);
                const mag = await db.GetMagByStudent(user.id, schedule)
                res.send({ mag: mag, les: les });
    }
    else{
              res.status(403).end();
            }
}
module.exports = {
    GetStudent,PostStudent
}