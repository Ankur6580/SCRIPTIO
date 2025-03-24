require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const fs = require("fs");

if (!fs.existsSync("/data")) {
  fs.mkdirSync("/data", { recursive: true });
  console.log("✅ /data directory created.");
} else {
  console.log("✅ /data directory already exists.");
}

const authRouter = require("./auth/authRoutes");
app.use("/api/auth", authRouter);

const aiRouter = require("./ai/apiRoutes");
app.use("/api/ai", aiRouter);

const { deleteUser } = require("./auth/deleteUser");
app.post("/api/auth/deleteuser", deleteUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
