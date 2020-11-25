import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import { getCache } from "../services/cache"; // Import Cache service from services folder.
import config from "../config"; // Import config with process environments.
import User from "../models/userModel"; // Import user model and interface from model folder.
import { HeroInterface, compareId, getApiResources } from "../utils/index"; // Import utils methods from utils folder.

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

// Find user from database.
const findUser = async (userId: string): Promise<HeroInterface> => {
  // Get hero from database use cache mechanism for checking if data is cached if it doesn't cache new data.
  return (await getCache(userId, async () => {
    // Find user from database.
    const findUser = await User.findById(userId, {
      password: 0,
    });
    // Return user as HeroInterface.
    return findUser;
  })) as HeroInterface;
};

// Function expresion getElemementsById returns resources by id from API.
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
    // Get hero from database.
    const getHero = await findUser(userId);
    // Check if resourcesName are planets if is true change resourcesName to homeworld or if is false just null.
    resourcesName === "planets" ? (resourcesName = "homeworld") : null;
    // Get data from user hero by resourcesName.
    const heroElements = (getHero as any)["hero"][resourcesName];
    // Check if user hero resources id if the same as request id.
    const checkId = compareId(heroElements, id);
    // If checkId is true use a cache mechanism and get data from API or cache.
    if (checkId) {
      const getResourcesById = await getApiResources(API_PATH);
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

// Function expresion getFilms returns films resources from API.
export const getFilms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId } = req;
    // Get hero from database.
    const getHero = await findUser(userId);
    // Get films from user hero.
    const { films } = getHero.hero;
    // Check if hero films resources have data.
    if (getHero.hero.films.length === 0) {
      // If it is true, response 400 Bad Request, send the message.
      return res.status(400).send({
        message: "This hero don't have films.",
      });
    } else {
      // If it is false, loop all films and get resources then wait for all promises are resolved and return data.
      const getFilms = await getApiResources(films);
      // Response films resources data.
      return res.status(200).send(getFilms);
    }
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};

// Function expresion getSpecies returns species resources from API.
export const getSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId } = req;
    // Get hero from database.
    const getHero = await findUser(userId);
    // Get species from user hero.
    const { species } = getHero.hero;
    // Check if hero species resources have data.
    if (getHero.hero.species.length === 0) {
      // If it is true, response 400 Bad Request, send the message.
      return res.status(400).send({
        message: "This hero don't have species.",
      });
    } else {
      // If it is false, loop all species and get resources then wait for all promises are resolved and return data.
      const getSpecies = await getApiResources(species);
      // Response species resources data.
      return res.status(200).send(getSpecies);
    }
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};

// Function expresion getVehicles returns vehicles resources from API.
export const getVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId } = req;
    // Get hero from database.
    const getHero = await findUser(userId);
    // Get vehicles from user hero.
    const { vehicles } = getHero.hero;
    // Check if hero vehicles resources have data.
    if (getHero.hero.vehicles.length === 0) {
      // If it is true, response 400 Bad Request, send the message.
      return res.status(400).send({
        message: "This hero don't have vehicles.",
      });
    } else {
      // If it is false, loop all vehicles and get resources then wait for all promises are resolved and return data.
      const getVehicles = await getApiResources(vehicles);
      // Response vehicles resources data.
      return res.status(200).send(getVehicles);
    }
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};

// Function expresion getStarships returns starships resources from API.
export const getStarships = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId } = req;
    // Get hero from database.
    const getHero = await findUser(userId);
    // Get starships from user hero.
    const { starships } = getHero.hero;
    // Check if hero starships resources have data.
    if (getHero.hero.starships.length === 0) {
      // If it is true, response 400 Bad Request, send the message.
      return res.status(400).send({
        message: "This hero don't have starships.",
      });
    } else {
      // If it is false, loop all starships and get resources then wait for all promises are resolved and return data.
      const getStarships = await getApiResources(starships);
      // Response starships resources data.
      res.status(200).send(getStarships);
    }
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};

// Function expresion getPlanets returns planets resources from API.
export const getPlanets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block.
  try {
    // Set variables from request.
    const { userId } = req;
    // Get hero from database.
    const getHero = await findUser(userId);
    // Get homeworld from user hero.
    const { homeworld } = getHero.hero;
    // Get planets resources use cache mechanism and get data from API or cache.
    const getPlanets = await getApiResources(homeworld);
    // Response starships resources data.
    return res.status(200).send(getPlanets);
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};
