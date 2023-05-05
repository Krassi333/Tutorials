const router = require('express').Router();

router.get('/', (req, res) => {

    if (req.user) {
        //user home page
        res.render('user-home', {
            title: 'Home Page',
            user: req.user
        })
    } else {
        //guest home page
        res.render('guest-home', {
            title: 'Home Page'
        })
    }

});

module.exports = router;