import express from "express";
import { islogged } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", islogged, getUsersForSidebar);
router.get("/:id", islogged, getMessages);

router.post("/send/:id", islogged, sendMessage);

export default router;