const sql = require("./../db");

// constructor
const WordMatrix = function (wordMatrix) {
  this.matrixId = wordMatrix.matrixId;
  this.gameId = wordMatrix.gameId;
  this.word = wordMatrix.word;
  this.color = wordMatrix.color;
  this.marked = wordMatrix.marked;
};

WordMatrix.create = (newPlayer, result) => {
  sql.query("INSERT INTO WORD_MATRIX SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { ...newPlayer });
    result(null, { ...newPlayer });
  });
};

WordMatrix.getwordMatrixByGameId = (gameId, result) => {
  sql.query(
    `SELECT * FROM WORD_MATRIX WHERE gameId = '${gameId}'`,
    (err, res) => {
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
    }
  );
};

module.exports = WordMatrix;
