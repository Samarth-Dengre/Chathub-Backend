const router = require("express").Router();

router.use("/api/auth", require("./userRoutes"));
router.use("/api/messages", require("./messagesRoutes"));
router.use("/api/friend", require("./friends"));
module.exports = router;
