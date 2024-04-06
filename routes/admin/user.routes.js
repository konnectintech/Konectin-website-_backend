const router = require("express").Router();
const user = require("../../controllers/admin/user.controllers");
const { verifyAdmin } = require("../../helpers/jsonwebtoken")

router.get("/users", verifyAdmin, user.getUsers);
router.get("/users/:userId", verifyAdmin, user.getUser);


module.exports = router;