const Player = require("../models/player.model");

const { v1: uuidv1 } = require("uuid");

// Create and Save a new Player
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Player
  const player = new Player({
    PLAYER_ID: uuidv1(),
    PLAYER_NAME: req.body.playerName,
    GAME_ID: req.body.gameId,
    IS_GAME_MANAGER: req.body.isGameManager,
  });

  // Save Player in the database
  Player.create(player, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the player.",
      });
    else res.send(data);
  });
};
