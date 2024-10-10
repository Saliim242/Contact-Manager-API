const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validationToken");

const {
  loginUser,
  registorUser,
  currentUser,
} = require("../controllers/userController");

// Login Part
router.post("/login", loginUser);
// Registor Part
router.post("/registor", registorUser);
// Cureent User Information Part
router.get("/current", validateUser, currentUser);

module.exports = router;
