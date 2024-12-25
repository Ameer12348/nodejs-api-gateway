const express = require("express");

const router = express.Router();
const authRoute = require("./auth.route");
const bookRoute = require("./book.route");

router.use(authRoute);
router.use(bookRoute);

module.exports = router;
