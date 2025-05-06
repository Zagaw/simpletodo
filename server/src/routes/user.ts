import { Router } from "express"
import { getProfile, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default router;