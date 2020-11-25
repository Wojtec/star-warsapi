import { Router } from "express";

const router: Router = Router();

/**
 *
 * AUTH ROUTES
 *
 * */

import { signUp, signIn } from "../controllers/authController";

// POST register route.
router.post(`/register`, signUp);
// POST login route.
router.post(`/login`, signIn);

export default router;
