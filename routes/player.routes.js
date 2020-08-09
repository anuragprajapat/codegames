module.exports = (app) => {
  const player = require("../controller/player.controller");

  // Create a new Game
  app.post("/player", player.create);

  // Retrieve a single Game with customerId
  // app.get("/player/:playerId", game.findOne);

  // Update a Game with gameId
  //   app.put("/customers/:customerId", game.update);

  // Delete a Game with gameId
  // app.delete("/player/:playerId", game.delete);
};
