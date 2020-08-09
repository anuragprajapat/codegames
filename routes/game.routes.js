module.exports = (app) => {
  const game = require("../controller/game.controller");

  // Create a new Game
  app.post("/game", game.create);

  // Retrieve a single Game with customerId
  app.get("/game/:gameId", game.findOne);

  // Update a Game with gameId
  //   app.put("/customers/:customerId", game.update);

  // Delete a Game with gameId
  app.delete("/customers/:gameId", game.delete);
};
