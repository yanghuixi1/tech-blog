const router = require("express").Router();
const { User, Post } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth.withAuth, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    let post = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    currentUser.addPost([post]);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
