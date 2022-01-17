const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Place the below routes under the /api resource path
router.use("/users", userRoutes);

module.exports = router;
