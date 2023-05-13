const Course = require('../models/Course');


async function getAllByDate() {
    return Course.find({}).sort({ createdAt: 1 }).lean();
}

async function getRecent() {
    return Course.find({}).sort({ userCount: -1 }).limit(3).lean();
}

async function createCourse(course) {
    console.log('here');
    return Course.create(course);
}

async function getById(id) {
    console.log(id);
    return Course.findById(id).lean();
}

async function deleteById(id) {
    // console.log(id);
    return Course.findByIdAndDelete(id);
}

async function editById(id, newData) {
    return Course.findByIdAndUpdate(id, newData);
}

async function updateById(id, data) {
    const existing = await Course.findById(id);

    existing.title = data.title;
    existing.imageUrl = data.imageUrl;
    existing.description = data.description;
    existing.duration = data.duration;

    return existing.save();
}

async function enrollUser(courseId, userId) {
    const course = await Course.findById(courseId);

    course.users.push(userId);
    course.userCount++;
    return course.save();
}

module.exports = {
    getAllByDate,
    getRecent,
    createCourse,
    getById,
    deleteById,
    editById,
    updateById,
    enrollUser
}