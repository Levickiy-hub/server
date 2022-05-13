const db = require('./dbConfig');
const bcrypt = require('bcrypt');
async function CreateUser(name, login, password, role, subgroup=null) {
   await db.User.create({
        name: name,
        login: login,
        password: bcrypt.hashSync(password, 10),
        role: role,
        subgroup: subgroup
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateCourse(course) {
    await db.Course.create({
     course:course
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateGroup(course, number, subgroup) {
    await db.Group.create({
        course: course,
        number: number,
        subgroup: subgroup
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateLesson(name, course, number) {
    await db.Lesson.create({
        course: course,
        name: name,
        number:number
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateDay(name){
    await db.Days.create(
        {day:name}
    )
};
async function CreateDayTime(schedule,day,time,week=null){
    await db.DaysTimes.create(
        {
            schedule:schedule,
            time:time,
            day:day,
            week:week
        }
    )
};
async function CreateSchedule(subgroup, lesson, teacher) {
    await db.Schedule.create({
        subgroup: subgroup,
        lesson: lesson,
        teacher: teacher
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateMag(schedule, student, number,rating) {
    await db.Mag.create({
        schedule: schedule,
        student:student,
        number:number,
        rating:rating
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateTime(time_start,time_end) {
    await db.Times.create({
        time_start:time_start,
        time_end:time_end
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function UpdateMag(id,schedule, student, number, rating) {
    await db.Mag.update({
        schedule: schedule,
        student: student,
        number: number,
        rating: rating
    }, { where: {id:id}}).then(res => {
    }).catch(err => console.log(err));
};
async function GetStudentByGroup(subgroup) {
    const users = await db.User.findAll({ where: { subgroup: subgroup }, raw: true });
    return users;
};
async function GetTeacher() {
    const users = await db.User.findAll({ where: { role: 'teacher' }, raw: true });
    return users;
};
async function GetStudent() {
    const users = await db.User.findAll({ where: { role: 'student' }, raw: true });
    return users;
};
async function GetStudentById(id) {
    const users = await db.User.findOne({ where: { id:id }, raw: true });
    return users;
};
async function GetGroups() {
    const groups = await db.Group.findAll();
    return groups;
};
async function GetGroupsById(id) {
    const groups = await db.Group.findOne({where:{id:id}});
    return groups;
};
async function GetDays() {
    const days = await db.Days.findAll();
    return days;
};
async function GetTimes() {
    const time = await db.Times.findAll();
    return time;
};
async function GetDayTime(id) {
    const daytime = await db.DaysTimes.findOne({where:{id:id}});
    return daytime;
};
async function GetDayTimeBySchedule(id) {
    const daytime = await db.DaysTimes.findAll({where:{schedule:id}});
    return daytime;
};
async function GetUserByLogin(login) {
    const user = await db.User.findOne({ where: { login: login }, raw: true });
    return user;
};
async function GSTG() {
    const users = await db.sequelize.query('select users.id,users.name,users.login, users.role, users.subgroup as gid, groups.course,groups.number, groups.subgroup from users left join groups on users.subgroup=groups.id where users.role=\'student\';');
    return users;
};
async function GetSchedule() {
    const Schedule = await db.sequelize.query('select Schedules.id, lessons.id as lId, LESSONS.NAME, groups.id as gId, groups.course,\n' +
        'groups.number, groups.subgroup, users.id as uId, users.name as teacher, days_times.id  as dtid, days_times.week,' +
        'days.day,\n' +
        'times.time_start, times.time_end from Schedules\n' +
        'LEFT JOIN users on schedules.teacher = users.id left join LESSONS on Schedules.lesson = Lessons.id\n' +
        'left join groups on Schedules.subgroup = groups.id\n' +
        'LEFT JOIN days_times on Schedules.id = days_times.schedule \n' +
        'LEFT JOIN days on days_times.day = days.id \n' +
        'left join times on days_times.time = times.id order by teacher,course,number,subgroup;');
    return Schedule;
};
async function GetScheduleByGroup(subgroup) {
    const Schedule = await db.Schedule.findAll({where:{subgroup:subgroup}});
    return Schedule;
};
async function GetScheduleByTeacher(teacher) {
    const Schedule = await db.Schedule.findAll({where:{teacher:teacher}});
    return Schedule;
};
async function GetScheduleById(id) {
    const Schedule = await db.Schedule.findOne({where:{id:id}});
    return Schedule;
};
async function GetLessons(){
    const lessons = await db.Lesson.findAll();
    return lessons;
};
async function GetLessonsByCourse(course) {
    const lessons = await db.Lesson.findAll({ where: { course: course }, raw: true });
    return lessons;
};

async function GetLessonsByTeacher(teacher) {
    const lessons = await db.Schedule.findAll({ where: { teacher: teacher }, raw: true });
    return lessons;
};
async function GetCourses() {
    const courses = await db.Course.findAll({ order: [[ 'id', 'ASC' ]]});
    return courses;
};
async function GetCourseById(id) {
    const course = await db.Course.findOne({ where: {id:id}});
    return course;
};
async function GLBTC(course, teacher) {
    const lessons = await db.sequelize.query("select Schedules.id,LESSONS.NAME,LESSONS.number as col,Schedules.lesson,groups.number,groups.subgroup, groups.id as group  from Schedules,LESSONS, groups where Schedules.teacher = '" + teacher + "' AND Schedules.lesson = lessons.id and  groups.id = Schedules.subgroup and lessons.course ='" + course + "';");
    return lessons;
};
async function GetLessonsBySubgroup(subgroup) {
    const lessons = await db.sequelize.query('select schedules.id as id, lessons.id as lessons,lessons.name,lessons.number from schedules inner join lessons on lessons.id = schedules.lesson where subgroup = ' + subgroup + ';');
    return lessons;
};
async function GetMagsByStudent(student_id) {
    const mags = await db.sequelize.query('select lessons.name,lessons.number as amount,mags.number,mags.rating from lessons left join schedules on lessons.id = schedules.lesson join users on users.subgroup = schedules.subgroup left join mags on mags.schedule = schedules.id and mags.student = users.id where users.id ='+student_id+' order by name, number;');
    return mags;
};
async function GetLessonsById(id) {
    const lessons = await db.Lesson.findOne({ where: {id:id}});
    return lessons;
};

async function GetMagByStudent(student, schedule) {
    const Mag = await db.Mag.findAll({ where: { student: student, schedule:schedule }, raw: true });
    return Mag;
};
async function GetMagBySchedules(id) {
    const lessons = await db.Mag.findAll({ where: { schedule: id }, raw: true });
    return lessons;
};
async function UpdateTeacher(id,name,login) {
    await db.User.update({ name: name, login: login },{ where: { id: id } });

};
async function UpdateLesson(id, name, course,number) {
    await db.Lesson.update({ name: name,  course: course,number:number },{ where: { id: id } });
};
async function UpdateSchedule(id, subgroup, lesson, teacher) {
    await db.Schedule.update({
        subgroup: subgroup,
        lesson: lesson,
        teacher: teacher }, { where: { id: id } });

};
async function UpdateUser(id, name,login,subgroup) {
    await db.User.update({
        name: name,
        login: login,
        subgroup:subgroup
    }, { where: { id: id } });

};
async function UpdatePassword(id, password) {
    await db.User.update({
        password: bcrypt.hashSync(password, 10)
    }, { where: { id: id } });

};
async function DeleteTeacher(id){
    await db.User.destroy({where:{id:id}});
};
async function DeleteLesson(id){
        await db.Lesson.destroy({where:{id:id}});
        await db.Schedule.findAll({where:{lesson:id}}).then((value => {
            value.forEach(async data=>{
                await DeleteSchedule(data.getDataValue('id'));
            })
        }));
};
async function DeleteGroup(id){
        db.Schedule.findAll({where:{subgroup:id}}).then(( value =>{
             value.forEach( async data=>{
                  await DeleteSchedule(data.getDataValue('id'));
            })
        }
        ));
        await db.Group.destroy({where:{id:id}})
};
async function DeleteSchedule(id){
    await db.Schedule.destroy({where:{id:id}})
    await db.Mag.destroy({where:{schedule:id}})
    await db.DaysTimes.destroy({where:{schedule:id}})
}
async function DeleteDayTime(id){
    await db.DaysTimes.destroy({where:{id:id}})
}
async function DeleteStudent(id){
    await db.User.destroy({where:{id:id}})
    await db.Mag.destroy({where:{student:id}})
}
    module.exports = {
        CreateUser, CreateCourse, CreateGroup, CreateLesson, CreateSchedule, CreateMag,
        CreateDay,CreateDayTime,CreateTime,
        GetStudentByGroup, GetUserByLogin, GetTeacher, GetStudent, GetSchedule, GetGroups,
        GetLessonsByCourse, GetLessonsByTeacher, GetLessons, GetCourses, GetCourseById,
        GetLessonsBySubgroup, GetMagByStudent, GetLessonsById, GLBTC, GSTG,GetGroupsById,
        GetMagBySchedules,GetStudentById,GetScheduleByGroup,GetMagsByStudent,GetDays,GetDayTime,GetTimes,GetDayTimeBySchedule,
        UpdateTeacher, UpdateLesson, UpdateSchedule, UpdateUser, UpdatePassword, UpdateMag,
        DeleteTeacher,DeleteLesson,DeleteGroup,DeleteSchedule,DeleteStudent,DeleteDayTime,
        GetScheduleById,GetScheduleByTeacher

    }