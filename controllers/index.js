// require dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const postRoutes = require("./postRoutes");
const { User, Post } = require("../models");
const auth = require("../utils/auth");
const moment = require("moment");

router.use("/api", apiRoutes);
router.use("/posts", postRoutes);

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [User] });
    const postsPlain = await posts.map((post) => post.get({ plain: true }));

    // Convert the created date into a more user-friendly format
    postsPlain.map((post) => {
      post.date_created = moment(post.date_created).format("MM/DD/YYYY");
      return post;
    });
    console.log(postsPlain);

    res.render("home", {
      posts: postsPlain,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Signup route
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  // Otherwise, render the signup template
  res.render("signup");
});

router.get("/dashboard", auth.withAuth, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    const posts = await currentUser.getPosts({
      attributes: { exclude: ["id", "content", "user_id"] },
    });
    const userPlain = currentUser.get({ plain: true }); // Converts database object into plain object
    const postsPlain = await posts.map((post) => post.get({ plain: true }));

    postsPlain.map((post) => {
      post.date_created = moment(post.date_created).format("MM/DD/YYYY"); // Convert the created date into a more user-friendly format
      return post;
    });

    res.render("dashboard", {
      ...userPlain, // Spreads the user object into multiple variables (id and email)
      page_name: "Your Dashboard",
      posts: postsPlain,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
