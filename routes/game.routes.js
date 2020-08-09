module.exports = (app) => {
  const game = require("../controller/game.controller");

  // Create a new Game
  app.post("/game", game.create);

  // Retrieve a single Game with customerId
  app.get("/game/:gameId", game.findOne);

  // Update a Game with gameId
  app.put("/game/:gameId", game.updateGame);

  //end Turn
  //TO DO
  //   app.post("/game/:gameId/endTurn", game.endTurn);

  // Delete a Game with gameId
  app.delete("/game/:gameId", game.delete);
};
