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

WordMatrix.updateById = (wordMatrix, result) => {
  sql.query(
    "UPDATE WORD_MATRIX SET marked = ?  WHERE gameId = ? AND matrixId = ?",
    ["Y", wordMatrix.gameId, wordMatrix.matrixId],
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

      console.log("updated word matrix: ", { ...wordMatrix });
      result(null, { ...wordMatrix });
    }
  );
};

module.exports = WordMatrix;
