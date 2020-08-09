const sql = require("./../db");
const { GAME_STATUS } = require("../constants");

// constructor
const Game = function (game) {
  this.GAME_ID = game.GAME_ID;
  this.ROOM_NAME = game.ROOM_NAME;
  this.STATUS = GAME_STATUS.WAITING_TO_START;
  this.WORD_MATRIX_ID = "";
  this.BLUE_WORDS_REMAINING = 7;
  this.RED_WORDS_REMAINING = 8;
  this.CLUE_WORD = "";
  this.CLUE_COUNT = 0;
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
  sql.query(`SELECT * FROM GAME WHERE GAME_ID = '${gameId}'`, (err, res) => {
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
    result({ kind: "not_found" }, null);
  });
};

// Game.updateById = (gameId, game, result) => {
//   sql.query(
//     "UPDATE GAME SET email = ?, name = ?, active = ? WHERE id = ?",
//     [game.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };

Game.remove = (gameId, result) => {
  sql.query("DELETE FROM GAME WHERE GAME_ID = ?", gameId, (err, res) => {
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
