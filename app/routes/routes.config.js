const jwt = require('../../config/jwt.config');

module.exports = app => {
  const users = require("../controllers/users.controller");
  const auth = require("../controllers/auth.controller");

  app.post("/auth", auth.login);
  app.get("/auth/logout", auth.logout);
  app.get("/auth/tokens", auth.listTokens);

  app.get("/users", jwt.isAuthorized , users.list);
  app.post("/users", users.create);
  app.get("/users/:userId", users.findone);
  app.put("/users/:userId", users.update);
  app.delete("/users/:userId", users.remove);
  app.delete("/users/remove", users.removeAll);
};


