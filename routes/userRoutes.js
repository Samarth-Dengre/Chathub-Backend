const router = require("express").Router();
const UsersController = require("../controllers/usersContoller");

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.post("/setAvatar/:id", UsersController.setAvatar);
router.get("/allUsers/:id", UsersController.getAllUsers);
router.get("/getTotalUsers", UsersController.getTotalUsers);
router.get("/searchUsers/:value", UsersController.searchUsers);
router.get("/userDetails/:id", UsersController.getUserDetails);
router.post("/updateDetails", UsersController.updateUser);
router.post("/updateAbout", UsersController.updateAbout);
router.post(
  "/verifyEmailForRegistration",
  UsersController.sendEmailVerificationLink
);
router.post(
  "/verifyEmailForResetPassword",
  UsersController.sendEmailVerificationLinkForResetPassword
);
router.post("/resetPassword", UsersController.resetPassword);
router.delete("/deleteAccount/:id", UsersController.deleteAccount);
module.exports = router;
