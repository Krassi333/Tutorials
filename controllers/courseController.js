
const { createCourse, getById, deleteById, editById, updateById } = require('../services/courseServise');
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
    const isOwner = course.owner.toString() == req.user._id.toString();
    const enrolled = true;

    res.render('details', {
        title: course.title,
        body: course,
        isOwner,
        enrolled
    });
});

router.get('/:id/delete', async (req, res) => {
    const course = await getById(req.params.id);

    if (course && course.owner.toString() != req.user._id) {
        //console.log('in if');
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/');
});

router.get('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
    console.log(course._id);
    res.render('edit', {
        title: 'Edit course',
        body: course
    })
});

router.post('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
 console.log('here');
    if (course.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    try {
       
        await updateById(req.params.id, req.body);
        res.redirect(`/course/${req.params.id}`);
    } catch (err) {
        console.log('error');

        res.render('edit', {
            title: 'Edit course',
            body: req.body,
            errors: parseError(err)
        })
    }
})

module.exports = router;