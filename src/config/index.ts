/**
 *
 * ENV CONFIG
 *
 **/

// Config file for the process environment if the project will be in production all OR operators with strings will be deleted.
export = {
  PORT: process.env.PORT || "3000",
  secret: process.env.TOKEN_SECRET || "cookie",
  DB_URI: process.env.DB_URI || "mongodb://mongo:27017/star",
  API_PATH: process.env.API_PATH || "http://swapi.dev/api/",
};
