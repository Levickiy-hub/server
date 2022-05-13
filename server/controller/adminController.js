const db = require("../db/db");

async function GetTeacher(req,res){
    try {
        let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
        if (user && user.role === 'admin') {
        const data=await JSON.stringify(await db.GetTeacher());
        console.log(data);
        res.send(data);
        }
        else{
            res.status(403).end();
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

async function PostTeacher(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        let {parm, id, name, login} = req.body;
        console.log(req.body);
        console.log(parm);
        console.log(name[0]);
        console.log(login[0]);
        console.log(id);
        if (parm === 'add') {
            const user = await db.GetUserByLogin(login[0]);
            if(!user){
                 await db.CreateUser(name[0], login[0], '1234', 'teacher');
                await GetTeacher(req,res);

            }else{
                res.status(400);
                res.send({message:'login busy'});
            }
        } else if (parm === 'update') {
            if (Array.isArray(name)) {
                name = name[0];
            }
            if (Array.isArray(login)) {
                login = login[0]
            }
            await db.UpdateTeacher(id, name, login);
            await GetTeacher(req,res);
        }
    }
    else{
        res.status(403).end();
    }
}
async function GetLessons(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        await  res.send(JSON.stringify(await db.GetLessons()));
    }
    else{
        res.status(403).end();
    }
}
async function PostLessons(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        let { parm, id, name, course,number } = req.body;
        if (parm === 'add') {
           await db.CreateLesson(name[0], course[0],number[0]);
        }
        else if (parm === 'update') {
            if (Array.isArray(name)) {
                name = name[0];
            }
            if (Array.isArray(course)) {
                course = course[0]
            }
            if (Array.isArray(number)) {
                number = number[0]
            }
            await db.UpdateLesson(id, name, course,number);
        }
        await GetLessons(req,res);
    }
    else{
        res.status(403).end();
    }

}
async function PutLessons(req,res){
    let user = (req.session.passport != undefined) ? req.session.passport.user : null;
    if (user && user.role == 'admin') {
        const id =req.params.id;
        let {name, course,number } =req.body;
        if (Array.isArray(name)) {
            name = name[0];
        }
        if (Array.isArray(course)) {
            course = course[0]
        }
        if (Array.isArray(number)) {
            number = number[0]
        }
        await db.UpdateLesson(id,name,course,number);
        await GetTeacher(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function GetSchedule(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        let Schedule = await db.GetSchedule();
        let courses = await db.GetCourses();
        let teachers = await db.GetTeacher();
        let lessons = await db.GetLessons();
        let groups = await db.GetGroups();
        let days = await db.GetDays();
        let times = await db.GetTimes();
        // console.log(groups);
        res.send(JSON.stringify( { schedule: Schedule[0], teachers: teachers, courses: courses, lessons: lessons, groups: groups,days:days,times:times }));
    }
    else{
        res.status(403).end();
    }
}
async function PostSchedule(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const { parm, id, lesson, group, teacher } = req.body;
        if (parm === 'add') {
            const les = await db.GetLessonsById(lesson);
            const gr = await db.GetGroupsById(group)
            if(les.course === gr.course){
                await db.CreateSchedule(group, lesson, teacher);
            }
            else{
                res.status(400);
                res.send({message:'need '+les.course+' course'});
                return
            }
        }
        else if (parm === 'update') {
            const les = await db.GetLessonsById(lesson);
            const gr = await db.GetGroupsById(group)
            if (les.course === gr.course) {
                await db.UpdateSchedule(id, group, lesson, teacher);
            }
             else{
                    res.status(400);
                    res.send({message:'need '+les.course+' course'});
                    return
             }
        }
        await GetSchedule(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function GetStudents(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        let students = await db.GSTG();
        let groups = await db.GetGroups();
        res.send(JSON.stringify({ 'students': students[0], 'groups': groups }));
    }
    else{
        res.status(403).end();
    }
}
async function PostStudent(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const { parm, id, name, group, login } = req.body;
        console.log(parm);
        console.log(id);
        console.log(name[0]);
        console.log(login[0]);
        if (parm === 'add') {
            const user = await db.GetUserByLogin(login[0]);
            if(!user){
                await db.CreateUser(name[0], login[0], '1234', 'student', group);
                await GetStudents(req,res);
            }
            else{
                res.status(400);
                res.send({message:'login busy'});
            }
        }
        else if (parm === 'update') {
            let login1;
            let name1;
            if (Array.isArray(name)) {
                name1 = name[0];
            }
            if (Array.isArray(login)) {
                login1 = login[0]
            }
            await db.UpdateUser(id, name1,login1,group);
            await GetStudents(req,res);
        }
    }
    else{
        res.status(403).end();
    }
}
async function GetGroups(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        res.send(JSON.stringify(await db.GetGroups()));
        res.end();
    }
    else{
            res.status(403).end();
        }
}
async function PostGroup(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const { course, number,subgroup } = req.body;
        await db.CreateGroup(course,number,subgroup);
        await GetGroups(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function GetGroupStudent(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id = req.params.id;
        res.send(JSON.stringify(await db.GetStudentByGroup(id)));
    }
    else{
        res.status(403).end();
    }
}
async function DeleteTeacher(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id  = req.params.id;
        await db.DeleteTeacher(id)
        // res.status(204).end();
        await GetTeacher(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function DeleteLesson(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id  = req.params.id;
        await db.DeleteLesson(id)
        // res.status(204).end();
        await GetLessons(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function DeleteGroup(req,res){
    let user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id  = req.params.id;
        await db.DeleteGroup(id);
        // res.status(204).end();
        await GetGroups(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function DeleteSchedule(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id  = req.params.id;
        const dtid = req.params.dtid;
        const daystime = await db.GetDayTimeBySchedule(id);
        console.log(daystime.length);
        if(daystime.length>=2){
            await db.DeleteDayTime(dtid);
        }else{
            await db.DeleteSchedule(id);
        }
        await GetSchedule(req,res);
        // res.status(204).end();
    }
    else{
        res.status(403).end();
    }
}
async function DeleteStudent(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id  = req.params.id;
        await db.DeleteStudent(id)
        // res.status(204).end();
        await GetStudents(req,res);
    }
    else{
        res.status(403).end();
    }
}
async function GetStudentLesson(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id =req.params.id;
        const mags = await db.GetMagsByStudent(id);
        res.send( mags[0]);
    }
    else{
        res.status(403).end();
    }
}
async function PostDateTime(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const id =req.params.id;
        const {day,time,week}=req.body;
        let include = false;
        const schedule = await db.GetScheduleById(id);
        const grSchedule = await db.GetScheduleByGroup(schedule.subgroup);
        const tSchedule = await db.GetScheduleByTeacher(schedule.teacher);
        let array = [];
        let k =0;
        for(let i=0;i<grSchedule.length;i++){
           array[k]= await db.GetDayTimeBySchedule(grSchedule[i].id);
           k++;
        }
        for(let i=0;i<tSchedule.length;i++){
            array[k]= await db.GetDayTimeBySchedule(tSchedule[i].id);
            k++;
        }
        for(let i=0;i<array.length;i++){
            array[i].forEach(value=>{
                if(value.week === null){
                    if(value.day===day && value.time ===time){
                        include=true;
                    }
                else if(value.day===day && value.time ===time && value.week===week){
                    include=true;

                }
            }
            })
        }
        if(!include){
            await db.CreateDayTime(id,day,time,week);
            await GetSchedule(req,res);
        }
        else{
            res.status(400).send({'message':'данное время занято'})
        }

    }
    else{
        res.status(403).end();
    }
};
async function GetDateTime(req,res){
    const user = (req.session.passport !== undefined) ? req.session.passport.user : null;
    if (user && user.role === 'admin') {
        const tid =req.params.tid;
        const gid = req.params.gid;
        const grSchedule = await db.GetScheduleByGroup(gid);
        const tSchedule = await db.GetScheduleByTeacher(tid);
        let arrayTeacher = [];
        let arrayGroup = [];
        for(let i=0;i<grSchedule.length;i++){
            arrayGroup.push(await db.GetDayTimeBySchedule(grSchedule[i].id));
        }
        for(let i=0;i<tSchedule.length;i++){
            arrayTeacher.push(await db.GetDayTimeBySchedule(tSchedule[i].id));
        }
        res.send({teacher:arrayTeacher,group:arrayGroup});
    }
    else{
        res.status(403).end();
    }
}
module.exports = {
    GetTeacher,
    PostTeacher,
    GetLessons,
    PostLessons,
    GetSchedule,
    PostSchedule,
    GetStudents,
    PostStudent,
    GetGroups,
    PostGroup,
    DeleteTeacher,
    DeleteLesson,
    DeleteGroup,
    DeleteSchedule,
    DeleteStudent,
    GetGroupStudent,
    GetStudentLesson,
    PostDateTime,
    GetDateTime
}