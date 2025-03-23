const { verifyToken } = require("./authServices");

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid or Expired Token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = authenticateToken;
