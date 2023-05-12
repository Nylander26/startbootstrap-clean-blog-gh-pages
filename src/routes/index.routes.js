const { Router } = require('express');
const router = Router();

//GET ROUTES
router.get('/', (req, res) => {
    res.render('index');
})

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/contact', (req, res) => {
    res.render('contact');
})

router.get('/post', (req, res) => {
    res.render('post');
})

module.exports = router;