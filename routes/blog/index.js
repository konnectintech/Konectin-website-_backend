const router = require("express").Router();

const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes")

router.use("", postRoutes, commentRoutes)

module.exports = router;