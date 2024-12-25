const firebaseAuthController = require("../controllers/auth.controller");
const express = require("express");
const validate = require("../middleware/validate");
const { authValidation } = require("../validations");
const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/api/register",
  validate(authValidation.register),
  firebaseAuthController.registerUser
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/api/login",
  validate(authValidation.login),
  firebaseAuthController.loginUser
);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/api/logout", firebaseAuthController.logoutUser);

/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid input
 */
router.post(
  "/api/reset-password",
  validate(authValidation.resetPassword),
  firebaseAuthController.resetPassword
);

/**
 * @swagger
 * /api/on-auth-state-change:
 *   post:
 *     summary: Handle authentication state changes
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/api/on-auth-state-change", firebaseAuthController.refreshToken);

module.exports = router;
