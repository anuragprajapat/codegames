const sql = require("./../db");

// constructor
const Player = function (player) {
  this.PLAYER_ID = player.PLAYER_ID;
  this.PLAYER_NAME = player.PLAYER_NAME;
  this.GAME_ID = player.GAME_ID;
  this.TEAM_COLOR = "";
  this.IS_GAME_MANAGER = player.IS_GAME_MANAGER;
  this.IS_SPY_MASTER = "N";
};

Player.create = (newPlayer, result) => {
  sql.query("INSERT INTO PLAYER SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { insertId: res.insertId, ...newPlayer });
    result(null, { insertId: res.insertId, ...newPlayer });
  });
};

module.exports = Player;
