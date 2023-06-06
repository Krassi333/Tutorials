const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/parser');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

router.post('/register', isGuest(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long!')
        .isAlphanumeric().withMessage('Username may contain only letters and numbers!'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!')
        .isAlphanumeric().withMessage('Password may contain only letters and numbers!'),

    async (req, res) => {
        try {
            const { errors } = validationResult(req); //изважда грешките от валидацията на express

            if (errors.length > 0) {  // ако има грещки ги обработва
                throw errors;
            }

            if (req.body.password != req.body.repass) {
                throw new Error('Passwords don\'t match!');
            }
            //TODO check if register creates session 
            const token = await register(req.body.username, req.body.password);
console.log('authController register token '+token);
            res.cookie('token', token);

            res.redirect('/');  //TODO replace with redirect by assignment
        } catch (err) {

            const errors = parseError(err);

            //TODO Add error mesage to actual template 
            res.render('register', {
                title: "Register Page",
                errors,
                body: {
                    username: req.body.username
                }
            })
        }
    });

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);

        res.redirect('/'); //TODO replace with redirect by assignment
    } catch (err) {
        const errors = parseError(err);

        res.render('login', {
            title: "Login Page",
            errors,
            body: {
                username: req.body.username
            }
        })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')

})

module.exports = router;