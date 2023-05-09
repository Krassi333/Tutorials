
const { createCourse, getById } = require('../services/courseServise');
const { parseError } = require('../util/parser');

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('create', {
        title: "Create Page"
    });
});

router.post('/create', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    }

    try {
        await createCourse(course);
        res.redirect('/');
    } catch (err) {
        const errors = parseError(err);

        res.render('create', {
            title: "Create Page",
            body: course,
            errors
        });
    }
});

router.get('/:id', async (req, res) => {
    const course = await getById(req.params.id);

    res.render('details', {
        title: course.title,
        body:course
    });
});

module.exports = router;