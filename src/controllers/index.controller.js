//Dependencies required
//User requires the model for the DB
//indexCtrl is the variable that holds all the logic for later export
const BlogPost = require("../models/blogPost");
const indexCtrl = {};

//GET ROUTES
//---------------------------------------------------------------//

//@desc SHOWS THE HOME ROUTE
//@route GET /
//@access PUBLIC
indexCtrl.renderHome = (req, res) => {
  res.render("index");
};

//@desc SHOWS THE ABOUT ROUTE
//@route GET /about
//@access PUBLIC
indexCtrl.renderAbout = (req, res) => {
  res.render("about");
};

//@desc SHOWS THE CONTACT ROUTE
//@route GET /contact
//@access PUBLIC
indexCtrl.renderContact = (req, res) => {
  res.render("contact");
};

//@desc SHOWS THE POST ROUTE
//@route GET /posts
//@access PUBLIC
indexCtrl.renderPost = (req, res) => {
  res.render("post");
};

//@desc SHOWS THE CREATE POST ROUTE
//@route GET /posts/new
//@access PUBLIC
indexCtrl.renderCreatePost = (req, res) => {
  res.render("create");
};

//POST ROUTES
//---------------------------------------------------------------//

indexCtrl.storePosts = async (req, res) => {
  const post = new BlogPost({
    title: req.body.title,
    body: req.body.body,
  });
  post
    .save()
    .then(() => {
      console.log("Post Saved...");
      res.redirect("/posts");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = indexCtrl;
