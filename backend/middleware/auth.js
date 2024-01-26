import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies["jwtToken"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body = { username: decoded.username, userId: decoded.userid };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
