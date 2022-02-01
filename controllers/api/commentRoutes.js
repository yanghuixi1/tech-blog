const router = require("express").Router();
const { User, Comment } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth.withAuth, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    const currentPost = await User.findByPk(req.body.postId, {
      attributes: { exclude: ["password"] },
    });
    let comment = await Comment.create({
      content: req.body.content,
    });
    currentUser.addComment([comment]);
    currentPost.addComment([comment]);
    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
