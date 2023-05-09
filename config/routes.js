const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const { hasUser, isGuest } = require('../middlewares/guards');


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', isGuest(), authController);
    app.use('/course', hasUser(), courseController);
}