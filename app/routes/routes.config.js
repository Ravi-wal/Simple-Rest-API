const isAuthorized = require('../../config/jwt.config');

module.exports = app => {
  const users = require("../controllers/users.controller");
  const auth = require("../controllers/auth.controller");

  app.post("/auth", auth.login);

  app.get("/users", isAuthorized , users.list);
  app.post("/users", users.create);
  app.get("/users/:userId", users.findone);
  app.put("/users/:userId", users.update);
  app.delete("/users/:userId", users.remove);
  app.delete("/users/remove", users.removeAll);
};


