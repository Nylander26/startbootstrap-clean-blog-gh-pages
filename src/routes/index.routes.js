const { Router } = require('express');
const router = Router();
const { renderHome, renderAbout, renderContact, renderPost, renderCreatePost, storePosts } = require('../controllers/index.controller')

//GET ROUTES
router.get('/', renderHome)

router.get('/about', renderAbout)

router.get('/contact', renderContact)

router.get('/post/:id', renderPost)

router.get('/posts/new', renderCreatePost)

//POST ROUTES
router.post('/posts/store', storePosts);

module.exports = router;