const sql = require("./../db");
const { GAME_STATUS } = require("../constants");

// constructor
const Game = function (game) {
  this.gameId = game.gameId;
  this.roomName = game.roomName;
  this.status = GAME_STATUS.WAITING_TO_START;
  this.wordMatrixId = "";
  this.blueWordsRemaining = 7;
  this.redWordsRemaining = 8;
  this.clueWord = "";
  this.clueCount = 0;
};

Game.create = (newGame, result) => {
  sql.query("INSERT INTO GAME SET ?", newGame, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created game: ", { id: res.insertId, ...newGame });
    result(null, { ...newGame });
  });
};

Game.findById = (gameId, result) => {
  sql.query(`SELECT * FROM GAME WHERE gameId = '${gameId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // if game is found
    if (res.length) {
      console.log("found game: ", res[0]);
      result(null, res[0]);
      return;
      // get the all player data
    }
    // not found game with the id
    result({ message: "not_found" }, null);
  });
};

Game.update = (game, result) => {
  sql.query(
    "UPDATE GAME SET status = ?, wordMatrixId = ?, blueWordsRemaining = ?, redWordsRemaining = ?, clueWord= ?, clueCount=? WHERE gameId = ?",
    [
      game.status,
      game.wordMatrixId,
      game.blueWordsRemaining,
      game.redWordsRemaining,
      game.clueWord,
      game.clueCount,
      game.gameId,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated game: ", { ...game });
      result(null, { ...game });
    }
  );
};

Game.remove = (gameId, result) => {
  sql.query("DELETE FROM GAME WHERE gameId = ?", gameId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found game with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted game with id: ", id);
    result(null, res);
  });
};

module.exports = Game;
