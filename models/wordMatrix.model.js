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

module.exports = WordMatrix;
