//Dependencies required
//User requires the model for the DB
//indexCtrl is the variable that holds all the logic for later export
const BlogPost = require("../models/blogPost");
const User = require("../models/users");
const indexCtrl = {};
const path = require("path");
const bcrypt = require("bcrypt");

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
//@access PRIVATE
indexCtrl.renderCreatePost = (req, res) => {
  if (req.session.userId) {
    res.render("create");
  } else {
    console.log("Must login before create a post");
    res.redirect("/auth/login");
  }
};

//@desc SHOWS THE REGISTER PAGE FOR THE USER
//@route GET /auth/register
//@access PUBLIC
indexCtrl.renderNewUser = (req, res) => {
  res.render("register");
};

//@desc SHOWS THE LOGIN PAGE FOR THE USER
//@route GET /auth/login
//@access PUBLIC
indexCtrl.renderLogUser = (req, res) => {
  res.render("login");
};

//@desc LOGOUT PROTOCOL
//@route GET /auth/logout
//@access PRIVATE
indexCtrl.logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};

//POST ROUTES
//---------------------------------------------------------------//

indexCtrl.storePosts = (req, res) => {
  let image = req.files.image;
  const savePath = path.join(__dirname, "../../public/img", image.name);
  const { title, body } = req.body;

  if (req.files.image.mimetype === "image/jpeg") {
    image.mv(savePath);
    const post = new BlogPost({
      title,
      body,
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

indexCtrl.storeUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  await user.save().then(() => {
    console.log("User saved...");
    res.redirect("/");
  });
  console.error(error);
  res.redirect("/auth/register");
};

indexCtrl.logUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          console.log("User logged in...");
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          console.error("Password incorrect");
          res.redirect("/auth/login");
        }
      });
    }
  });
};

module.exports = indexCtrl;
