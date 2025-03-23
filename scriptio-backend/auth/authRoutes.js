const { registerUser, loginUser, getDashboard, getHome } = require("./authController")
const authenticateToken = require("./authMiddleware")

const router = require("express").Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/dashboard", authenticateToken, getDashboard);

router.get("/", getHome);

module.exports = router