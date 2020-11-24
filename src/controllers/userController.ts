import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import { getResources } from "../actions"; // Import Fetch from actions folder.
import { getCache } from "../services/cache"; // Import Cache service from services folder.
import config from "../config"; // Import config with process environments.
import User from "../models/userModel"; // Import user model and interface from model folder.
import { HeroInterface, compareId } from "../utils/index"; // Import utils methods from utils folder.

/**
 *
 * USER CONTROLLER
 * getElemementsById
 * getFilms
 * getSpecies
 * getVehicles
 * getStarships
 * getPlanets
 *
 * */

// Method getElemementsById returns resources by id from API.
export const getElemementsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId, path } = req;
    // Set variables from request params.
    const { id } = req.params;
    // Get resource name from request path.
    let resourcesName = path.split("/").slice(1, 2).join("/");
    // Create API path with resourse name and id from request params.
    const API_PATH = config.API_PATH + resourcesName + "/" + id + "/";
    // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
    const getHero = (await getCache(userId, async () => {
      // Find user from database.
      const findUser = await User.findById(userId, {
        password: 0,
      });
      // Return user as HeroInterface.
      return findUser;
    })) as HeroInterface;
    // Check if resourcesName are planets if is true change resourcesName to homeworld or if is false just null.
    resourcesName === "planets" ? (resourcesName = "homeworld") : null;
    // Get data from user hero by resourcesName.
    const heroElements = (getHero as any)["hero"][resourcesName];
    // Check if user hero resources id if the same as request id.
    const checkId = compareId(heroElements, id);
    // If checkId is true use a cache mechanism and get data from API or cache.
    if (checkId) {
      console.log(API_PATH);
      const getResourcesById = await getCache(
        API_PATH,
        async () => await getResources(API_PATH)
      );
      // Return data resources.
      return res.status(200).send(getResourcesById);
    }
    // If checkId is false, response 400 Bad Request, send the message.
    return res.status(400).send({
      message: "Your hero don't have this resources",
    });
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};
