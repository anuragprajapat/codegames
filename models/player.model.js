const sql = require("./../db");

// constructor
const Player = function (player) {
  this.playerId = player.playerId;
  this.playerName = player.playerName;
  this.gameId = player.gameId;
  this.teamColor = player.teamColor;
  this.isGameManager = player.isGameManager;
  this.isSpyMaster = player.isSpyMaster;
};

Player.create = (newPlayer, result) => {
  sql.query("INSERT INTO PLAYER SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { ...newPlayer });
    result(null, { ...newPlayer });
  });
};

Player.updateById = (player, result) => {
  sql.query(
    "UPDATE PLAYER SET teamColor = ?, isSpyMaster = ? WHERE playerId = ?",
    [player.teamColor, player.isSpyMaster, player.playerId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "Not Updated" }, null);
        return;
      }

      console.log("updated player: ", { ...player });
      result(null, { ...player });
    }
  );
};

Player.findAll = (gameId, result) => {
  sql.query(`SELECT * FROM PLAYER WHERE gameId = '${gameId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // if game is found
    if (res.length) {
      console.log("found game: ", res);
      result(null, res);
      return;
      // get the all player data
    }
    // not found game with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Player;
