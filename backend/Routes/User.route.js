import { Router } from "express";
import { registerUser, loginUser, getUserData } from "../Controllers/User.controller.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/data/:id', getUserData);

export default router;