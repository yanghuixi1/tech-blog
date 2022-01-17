const withAuth = (req, res, next) => {
  // Prevents users from accessing a particular resource when they aren't logged in
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = { withAuth };
