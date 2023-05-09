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
    return Course.findById(id).lean();
}

module.exports = {
    getAllByDate,
    getRecent,
    createCourse,
    getById
}