const sql = require("./../db");

// constructor
const Player = function (player) {
  this.PLAYER_ID = player.playerId;
  this.PLAYER_NAME = player.playerName;
  this.GAME_ID = player.gameId;
  this.TEAM_COLOR = player.teamColor;
  this.IS_GAME_MANAGER = player.isGameManager;
  this.IS_SPY_MASTER = player.isSpyMaster;
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
    "UPDATE PLAYER SET TEAM_COLOR = ?, IS_SPY_MASTER = ? WHERE PLAYER_ID = ?",
    [player.TEAM_COLOR, player.IS_SPY_MASTER, player.PLAYER_ID],
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

      console.log("updated player: ", { ...player });
      result(null, { ...player });
    }
  );
};

Player.findAll = (gameId, result) => {
  sql.query(`SELECT * FROM PLAYER WHERE GAME_ID = '${gameId}'`, (err, res) => {
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
