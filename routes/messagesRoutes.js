const router = require("express").Router();

const messageController = require("../controllers/messagesController");

router.post("/addmsg", messageController.addMessage);
router.post("/getmsg", messageController.getAllMessage);
module.exports = router;
