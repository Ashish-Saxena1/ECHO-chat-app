import express from "express"
import { ProtectRoute } from "../middleware/auth.ProtectRoute.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router()

router.get("/users",ProtectRoute,getUserForSidebar)
router.get("/:id",ProtectRoute,getMessages)

router.post("/send/:id", ProtectRoute,sendMessage)

export default router;