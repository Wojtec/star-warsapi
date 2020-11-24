import { Router } from "express"; // Import router from express.

const router: Router = Router(); // Assign router method.

import { verifyToken } from "../middlewares/verifyToken"; // Import verifyToken middleware.
import { getElemementsById } from "../controllers/userController"; // Import user controller.

// GET BY ID ROUTES
// films by ID
router.get("/films/:id", verifyToken, getElemementsById);
// species by ID
router.get("/species/:id", verifyToken, getElemementsById);
// vehicles by ID
router.get("/vehicles/:id", verifyToken, getElemementsById);
// starships by ID
router.get("/starships/:id", verifyToken, getElemementsById);
// planets by ID
router.get("/planets/:id", verifyToken, getElemementsById);

export default router;
