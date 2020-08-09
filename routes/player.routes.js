module.exports = (app) => {
  const player = require("../controller/player.controller");

  // Create a new Game
  app.post("/player", player.create);

  app.put("/player/:playerId", player.update);

  //Retrieve allplayers by GameId
  app.get("/player/:gameId", player.findAll);

  // Update a Game with gameId
  //   app.put("/customers/:customerId", game.update);

  // Delete a Game with gameId
  // app.delete("/player/:playerId", game.delete);
};
