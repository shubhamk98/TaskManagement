import express from "express";
import { handleLogOut, handleLogin, handleSignUp } from "../controller/user.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogOut);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send(req.body);
});



export default router;
