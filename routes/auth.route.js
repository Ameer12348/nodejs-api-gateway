const firebaseAuthController = require("../controllers/auth.controller");
const express = require("express");
const validate = require("../middleware/validate");
const { authValidation } = require("../validations");
const router = express.Router();

router.post(
  "/api/register",
  validate(authValidation.register),
  firebaseAuthController.registerUser
);
router.post(
  "/api/login",
  validate(authValidation.login),
  firebaseAuthController.loginUser
);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post(
  "/api/reset-password",
  validate(authValidation.resetPassword),
  firebaseAuthController.resetPassword
);
router.post("/api/on-auth-state-change", firebaseAuthController.refreshToken);

module.exports = router;
