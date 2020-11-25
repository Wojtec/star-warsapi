import { Router } from "express"; // Import router from express.

const router: Router = Router(); // Assign router method.

/**
 *
 * USER ROUTES
 *
 * */

import { verifyToken } from "../middlewares/verifyToken"; // Import verifyToken middleware.
import {
  getElemementsById,
  getFilms,
  getSpecies,
  getVehicles,
  getStarships,
  getPlanets,
} from "../controllers/userController"; // Import user controller.

// GET films route.
router.get("/films", verifyToken, getFilms);
// GET species route.
router.get("/species", verifyToken, getSpecies);
// GET vehicles route.
router.get("/vehicles", verifyToken, getVehicles);
// GET starships route.
router.get("/starships", verifyToken, getStarships);
// GET planets route.
router.get("/planets", verifyToken, getPlanets);

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
