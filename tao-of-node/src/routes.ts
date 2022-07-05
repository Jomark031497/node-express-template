import { Router } from "express";

const router = Router();

// user routes
router.get("/me");
router.get("/logout");
router.post("/login");
router.post("/signUp");

export default router;
