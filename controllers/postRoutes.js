const router = require("express").Router();
const { User, Post } = require("../models");
const moment = require("moment");

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId, { include: [User] });
    const postPlain = await post.get({ plain: true });

    // Convert the created date into a more user-friendly format
    postPlain.date_created = moment(post.date_created).format("MM/DD/YYYY");

    res.render("post", {
      post: postPlain,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
