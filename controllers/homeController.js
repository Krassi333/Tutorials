const { getAllByDate, getRecent } = require('../services/courseServise');

const router = require('express').Router();


router.get('/', async (req, res) => {
    let view;
    let courses = [];

    if (req.user) {
        //user home page
        view = 'user-home';
        courses = await getAllByDate();

    } else {
        //guest home page
        view = 'guest-home';
        courses = await getRecent();

    }
    res.render(view, {
        title: 'Home Page',
        courses
    })
});

module.exports = router;