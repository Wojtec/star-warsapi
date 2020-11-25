# star-warsAPI

# Mandatory points

- Create file system.
- Create server.
- Create router.
- Create controllers.
- Create DB model.
- Sign up users should provide an email and password to create their account.During the registration process, the server should pick one hero at random from Star Wars API, for each new user.
- Encrypt, validate password.
- Consume API.
- Create authorization, authentication.
- Sign in with credentials provided during the registration process. All other resources must require authentication.
- Create cache mechanism
- Users can also get resources, through API, with a specific id.

* Resources:
* films - should return all films associated with a hero from the user profile.
* species - same, but species
* vehicles - same, but vehicles
* starships - same, but starships
* planets - same, but planets

- Docker Compose

# Installation

To get started with star-warsapi you need to clone project from git repository.

In your terminal:

```
git clone https://github.com/Wojtec/star-warsapi.git

```

## Run the application using a local server

Open project in your code editor and install all dependencies

Make sure that you are in correct path `/star-warsapi$` in your terminal and write :

```
npm install
```

Set up your mongoDB path URI and other environment variables.
```
npm start
```

Server should be listening on `http://localhost:3000`

To use application you will need some API testing tool for example `Postman` Available on [Postman](https://docs.api.getpostman.com/)

## Run the application using Docker , Docker-Compose

Build the image:

```
docker build -t starwars .
```

Run the image on port 3000:

```
sudo docker run -t -i -p 3000:3000 starwars
```

- Docker compose:

Build compose:

```
docker-compose build
```

Run the compose:

```
docker-compose up
```

# File system

    ├── docker-compose.yml              // Docker
    ├── Dockerfile                      // Docker
    ├── package.json                    // NPM
    ├── package-lock.json               // NPM
    ├── README.md                       // README
    ├── src                             // Source code folder
    │   ├── actions                     // Action folder contains all the methods associated with API consumption
    │   │   └── index.ts
    │   ├── app.ts                      // App main file
    │   ├── config                      // Config folder exporting all process environment variables
    │   │   └── index.ts
    │   ├── controllers                 // Controllers folder contains all the methods associated with authorization and user endpoints
    │   │   ├── authController.ts       // authController.ts contains all methods associated with login, register endpoints and jwt
    │   │   └── userController.ts       // userController.ts contains all methods associated with user resources endpoints
    │   ├── index.ts                    // Server file
    │   ├── middlewares                 // Middlewares folder contains all middlewares used by the application
    │   │   └── verifyToken.ts          // verifyToken.ts middleware used to verify user tokens
    │   ├── models                      // Models folder contains all the schemas associated with the database
    │   │   └── userModel.ts            // userModel.ts contains a user database schema and methods
    │   ├── routes                      // Routes folder contains all HTTP routes/endpoints
    │   │   ├── authRoutes.ts           // authRoutes.ts contains register, login endpoints
    │   │   └── userRoutes.ts           // userRoutes.ts contains user resources endpoints
    │   ├── services                    // Services folder contains all services used by the application
    │   │   └── cache.ts                // cache.ts contains all methods to cache mechanism
    │   └── utils                       // Utils folder contains all methods that are used in other functions
    │       └── index.ts
    ├── tsconfig.json                   // Typescript config
    └── types.d.ts                      // types.d.ts extra interface element to Request interface

## Endpoints

#Register
Sign up users should provide an email and password to create their account.
During the registration process, the server should pick one hero at random from Star Wars API, for each new user.

```
POST /api/v1/register
```

This endpoint will allow for the user to register to the application generate random hero and receive a token stored in the header as Authorization.

```csharp
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDAwMTM1NjQsImV4cCI6MzIwMDAzMDcyOH0.6HMZgHQY-7nP5bJsevOK3ZJts2-s3Gahd0Ca27bVG5g",
    "type": "Bearer",
    "expiresIn": 1600017164
}
```

In folder `/src/controllers/authController.ts` you can find methods to this endpoint.

Generate access token method:

```csharp
// Generate access token method with id parameter.
const generateAccessToken = (id: string): TokenInterface => {
  // Create expires token time in this case is 24 h 60 seconds * 60 minuts * 24 hours.
  const tokenExpires: number = 60 * 60 * 24;
  // Create a token from jwt.sign method with arguments id, secret and options like algorithm type and time expire.
  const token: string = jwt.sign({ _id: id }, config.secret, {
    algorithm: "HS256",
    expiresIn: tokenExpires,
  });
  // Return object with token, type of token, and time expire.
  return { token, type: "Bearer", expiresIn: tokenExpires };
};
```

Register method:

```csharp
// Register user method.
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block
  try {
    // Set variables from request body.
    const { email, password }: { email: string; password: string } = req.body;
    // Create new user object.
    const user: UserInterface = new User({
      // Set email from the request body into the email model database.
      email: email,
      // Set password from the request.
      password: password,
      // Set hero from util method getHero().
      hero: await getHero(),
    });

    // Encrypt user password.
    user.password = await user.encryptPassword(user.password);

    // Check if the user exists by email.
    const checkUser = await User.findOne({ email: user.email });
    // If the user exists, response 409 conflict, send the message.
    if (checkUser) {
      return res
        .status(409)
        .send({ message: "This address email already exists." });
    } else {
      // Save model in database.
      const savedUser = await user.save();
      // Destructure an object and get a token that is returned from the method generateAccessToken.
      const { token }: { token: string } = generateAccessToken(savedUser.id);
      // Response status 200 set header "Authorization" with token and send user json.
      res.status(200).header("Authorization", token).send(savedUser);
      // If is some error, catch and call the next function with an error argument in
    }
  } catch (err) {
    next(err);
  }
};

```

#Login

Sign in with credentials provided during the registration process.

```
POST /api/v1/login
```

This endpoint will allow for the user login to the application and recive a token stored in the header as Authorization.

```csharp
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDAwMTM1NjQsImV4cCI6MzIwMDAzMDcyOH0.6HMZgHQY-7nP5bJsevOK3ZJts2-s3Gahd0Ca27bVG5g",
    "type": "Bearer",
    "expiresIn": 1600017164
}
```

In folder `/src/controllers/authController.ts` you can find method to this endpoint.

Login method:

```csharp
//Login user method.
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block
  try {
    // Set variables from request body.
    const { email, password }: { email: string; password: string } = req.body;
    //Find user by email.
    const findUser = await User.findOne({ email: email });
    // If the user does not exist, response 400 Bad Request, send the message.
    if (!findUser)
      return res.status(400).send({ message: "Email is not valid." });
    //Validate user password.
    const validPassword: boolean = await findUser.validatePassword(password);
    // If the password is not valid, response 400 Bad Request, send the message.
    if (!validPassword)
      return res.status(400).send({ message: "Password is not valid." });
    // Destructure an object and get a token that is returned from the method generateAccessToken.
    const token = generateAccessToken(findUser.id);
    // Response status 200 set header "Authorization" with token and send user json.
    res.status(200).header("Authorization", token.token).send(token);
    // If is some error, catch and call the next function with an error argument in this case it will be error handler.
  } catch (err) {
    next(err);
  }
};
```

#Get resources by id

Users can also get resources, through API, with a specific id.

```
GET /api/v1/films/:id
GET /api/v1/species/:id
GET /api/v1/vehicles/:id
GET /api/v1/starships/:id
GET /api/v1/planets/:id
```

In folder `/src/controllers/userController.ts` you can find method to this endpoint.

Get user from database funciton:

```csharp
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
```

Get resources method:

```csharp
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
```

#Get films resources

Should return all films associated with a hero from the user profile.

```
GET /api/v1/films
```

Get films method:

```csharp
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
```

#Get species resources

Should return all species associated with a hero from the user profile.

```
GET /api/v1/species
```

Get species method:

```csharp
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
```

#Get vehicles resources

Should return all vehicles associated with a hero from the user profile.

```
GET /api/v1/vehicles
```

Get vehicles method:

```csharp
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
```

#Get starships resources

Should return all starships associated with a hero from the user profile.

```
GET /api/v1/starships
```

Get starships method:

```csharp
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
```

#Get planets resources

Should return all planets associated with a hero from the user profile.

```
GET /api/v1/planets
```

Get planets method:

```csharp
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

```
