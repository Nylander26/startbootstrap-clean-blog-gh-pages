//Dependencies required
//User requires the model for the DB
//indexCtrl is the variable that holds all the logic for later export
const BlogPost = require("../models/blogPost");
const indexCtrl = {};
const path = require("path");

//GET ROUTES
//---------------------------------------------------------------//

//@desc SHOWS THE HOME ROUTE
//@route GET /
//@access PUBLIC
indexCtrl.renderHome = async (req, res) => {
  const allPost = await BlogPost.find({});
  res.render("index", {
    allPost,
  });
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
indexCtrl.renderPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("post", { post });
};

//@desc SHOWS THE CREATE POST ROUTE
//@route GET /posts/new
//@access PUBLIC
indexCtrl.renderCreatePost = (req, res) => {
  res.render("create");
};

//POST ROUTES
//---------------------------------------------------------------//

indexCtrl.storePosts = (req, res) => {
  let image = req.files.image;
  const savePath = path.join(__dirname, "../../public/img", image.name);

  if (req.files.image.mimetype === "image/jpeg") {
    image.mv(savePath);
    const post = new BlogPost({
      title: req.body.title,
      body: req.body.body,
      image: "/img/" + image.name,
    });
    post.save().then(() => {
      console.log("Post Saved...");
      res.redirect("/");
    });
  } else {
    image = {};
    console.error("Suba solo archivos JPG, JPEG o PNG");
    res.redirect("/posts/new");
  }
};

module.exports = indexCtrl;
