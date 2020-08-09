module.exports = (app) => {
  const wordMatrix = require("../controller/wordMatrix.controller");

  // Create a new word matrix
  app.post("/wordMatrix/:gameId", wordMatrix.create);
};
