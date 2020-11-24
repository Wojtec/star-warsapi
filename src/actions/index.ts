import fetch from "node-fetch"; // Import node-fetch for feching API.
import config from "../config"; // Import config with process environments.

/**
 *
 * ACTIONS FOR API INTEGRATION
 * getPeople
 * findHero
 * getResources
 *
 * */

// Async method to fetching all people from API.
export const getPeople = async (): Promise<any> => {
  // try catch block
  try {
    // Fetch promise method with api path and method GET assigned to response variable.
    const response = await fetch(`${config.API_PATH}people`, {
      method: "GET",
    });
    // Resolve promise response and return json data from API.
    const result = await response.json();
    // If is no data in API throw error.
    if (!result) {
      throw new Error("Data people unavailable.");
    }
    // Return data json.
    return result;
    // If is some error, catch and display in console.log().
  } catch (err) {
    console.log(err);
  }
};

// Async method to fetching hero by ID from API.
export const findHero = async (id: number): Promise<any> => {
  // try catch block
  try {
    // Fetch promise method with api path and method GET assigned to response variable.
    const response = await fetch(`${config.API_PATH}people/${id}`, {
      method: "GET",
    });
    // Resolve promise response and return json data from API.
    const result = await response.json();
    // If is no data in API throw error.
    if (!result) {
      throw new Error("Data people unavailable.");
    }
    // Return data json.
    return result;
    // If is some error, catch and display in console.log().
  } catch (err) {
    console.log(err);
  }
};

// Async method for fetching all resources from API.
export const getResources = async (url: string): Promise<any> => {
  // try catch block
  try {
    // Fetch promise method with api path and method GET assigned to response variable.
    const response = await fetch(url, {
      method: "GET",
    });
    // Resolve promise response and return json data from API.
    const result = await response.json();
    // If is no data in API throw error.
    if (!result) {
      throw new Error("Data resources unavailable.");
    }
    // Return data json.
    return result;
    // If is some error, catch and display in console.log().
  } catch (err) {
    console.log(err);
  }
};
