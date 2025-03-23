const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  try {
    if (!id) {
      console.log("Invalid user details");
      return null;
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
