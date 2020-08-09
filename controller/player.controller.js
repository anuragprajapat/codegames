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
    playerId: uuidv1(),
    playerName: req.body.playerName,
    gameId: req.body.gameId,
    isGameManager: req.body.isGameManager,
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

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Player.updateById(
    new Player({ ...req.body, playerId: req.params.playerId }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.playerId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.playerId,
          });
        }
      } else res.send(data);
    }
  );
};

// Find a single Game with a customerId
exports.findAll = (req, res) => {
  Player.findAll(req.params.gameId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the game.",
      });
    else {
      res.send(data);
    }
  });
};
