import { getPeople, findHero } from "../actions"; // Import fetch methods from actions folder.

// Hero object interface for getHero method.
export interface HeroInterface {
  hero: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
    created: string;
    edited: string;
    url: string;
  };
}

//Get hero number for authController register method.
export const getHero = async (): Promise<HeroInterface | undefined> => {
  // try catch block.
  try {
    // Set min number, use for range random number.
    const minPeople: number = 1;
    // Get all people object from API.
    const people = await getPeople();
    // Get count property from people object.
    const { count }: { count: number } = people;
    // Get random id of hero.
    const heroId: number = Math.floor(
      Math.random() * (count - minPeople) + minPeople
    );
    // Find hero by id.
    const setHero = await findHero(heroId);
    // Return hero object to user registration.
    return setHero;
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    console.log(err);
  }
};

// Compare hero id from resources with id from request in userController.
export const compareId = (heroUrl: Array<string> | string, id: string) => {
  // Check if resources url are in array.
  if (Array.isArray(heroUrl)) {
    // Loop all urls.
    const heroId = heroUrl.map((url) => {
      // Split each url.
      const urlSplit = url.split("/");
      // Get id from url.
      const heroId = urlSplit[urlSplit.length - 2];
      // Return resources id in array.
      return heroId;
    });
    // Compare ids from array with id from request.
    const compareId = heroId.indexOf(id.toString()) >= 0;
    // Return true or false.
    return compareId;
  } else {
    // If heroUrl is a string, just split, get id and compare returning true or false.
    const urlSplit = heroUrl.split("/");
    // Get id from url.
    const heroId = urlSplit[urlSplit.length - 2];
    // Return true or false.
    return heroId === id ? true : false;
  }
};
