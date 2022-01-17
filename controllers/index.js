// require dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const { User } = require("../models");
const auth = require("../utils/auth");

router.use("/api", apiRoutes);

router.get("/", auth.withAuth, async (req, res) => {
  res.redirect("/dashboard");
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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    const user = userData.get({ plain: true }); // Converts database object into plain object
    res.render("dashboard", {
      ...user, // Spreads the user object into multiple variables (id and email)
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
