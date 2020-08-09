const Game = require("../models/game.model");

const { v1: uuidv1 } = require("uuid");

// Create and Save a new Game
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Game
  const game = new Game({
    GAME_ID: uuidv1(),
    ROOM_NAME: req.body.roomName,
  });

  // Save Game in the database
  Game.create(game, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the game.",
      });
    else res.send(data);
  });
};

// Find a single Game with a customerId
exports.findOne = (req, res) => {
  Game.findById(req.params.gameId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the game.",
      });
    else {
      res.send(data);
    }
  });
};

// Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {

// };

// Delete a Game with the specified customerId in the request
exports.delete = (req, res) => {};
