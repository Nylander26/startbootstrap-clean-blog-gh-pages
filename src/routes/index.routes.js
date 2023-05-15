const { Router } = require("express");
const router = Router();
const {
  renderHome,
  renderAbout,
  renderContact,
  renderPost,
  renderCreatePost,
  storePosts,
  renderNewUser,
  storeUser,
  renderLogUser,
  logUser,
  logoutController,
} = require("../controllers/index.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("../middlewares/redirectIfAuthenticatedMiddleware");

//GET ROUTES
router.get("/", renderHome);

router.get("/about", renderAbout);

router.get("/contact", renderContact);

router.get("/post/:id", renderPost);

router.get("/posts/new", authMiddleware, renderCreatePost);

router.get("/auth/register", redirectIfAuthenticatedMiddleware ,renderNewUser);

router.get("/auth/login", redirectIfAuthenticatedMiddleware ,renderLogUser);

router.get('/auth/logout', logoutController)

//POST ROUTES
router.post("/posts/store", authMiddleware, storePosts);

router.post("/users/register", redirectIfAuthenticatedMiddleware ,storeUser);

router.post("/users/login", redirectIfAuthenticatedMiddleware ,logUser);

module.exports = router;
