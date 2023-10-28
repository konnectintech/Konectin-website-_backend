const router = require("express").Router();

const userRoutes = require("./user");
const blogRoutes = require("./blog");
const commonRoutes = require("./common.routes.");

router.use("", userRoutes, blogRoutes, commonRoutes)

module.exports = router;