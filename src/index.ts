import app from "./app";

/**
 *
 * SERVER LISTEN ON PORT 3000
 *
 * */

(() => {
  app.listen(app.get("port"));
  console.log("Express server listening on port", app.get("port"));
})();
