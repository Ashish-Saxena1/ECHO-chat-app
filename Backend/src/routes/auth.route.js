import express from "express"
import { checkAuth, login, logout, signup, updateprofile } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.ProtectRoute.js";
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",ProtectRoute,updateprofile);
router.get("/check",ProtectRoute,checkAuth)


export default router;