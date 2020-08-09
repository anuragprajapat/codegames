const WordMatrix = require("../models/wordMatrix.model");

const { v4: uuidv1 } = require("uuid");
const { getRandomizer } = require("../utils/helpers");
const { TEAM } = require("../constants");

let wordsArr = [
  "unique",
  "underwear",
  "retain",
  "conscious",
  "famous",
  "hard",
  "dull",
  "decay",
  "earth",
  "harmony",
  "approval",
  "rule",
  "invention",
  "noiseless",
  "toe",
  "weep",
  "filthy",
  "repair",
  "relate",
  "song",
  "cheap",
  "sense",
  "quarter",
  "temper",
  "wiggly",
  "interest",
  "violent",
  "grade",
  "fine",
  "balls",
  "event",
  "string",
  "dime",
  "sheet",
  "equal",
  "support",
  "cope",
  "treatment",
  "listen",
  "idiotic",
  "cool",
  "impend",
  "kite",
  "fifth",
  "sheep",
  "cross",
  "rail",
  "insure",
  "horse",
  "business",
  "burst",
  "fulfil",
  "organic",
  "shaky",
  "inherit",
  "kittens",
  "position",
  "fair",
  "effect",
  "group",
  "kick",
  "sort",
  "recall",
  "steal",
  "horrify",
  "possible",
  "touch",
  "useful",
  "graceful",
  "train",
  "zinc",
  "amused",
  "dolls",
  "alert",
  "fax",
  "ghost",
  "face",
  "egg",
  "say",
  "mist",
  "cry",
  "pen",
  "grass",
  "stand",
  "son",
  "hold",
  "drop",
  "stove",
  "punish",
  "unit",
  "prose",
  "flop",
  "click",
  "plain",
  "hate",
  "patch",
  "past",
  "wash",
  "art",
  "fight",
  "clean",
  "jeans",
  "shock",
  "poor",
  "juicy",
  "think",
  "harm",
  "father",
  "advice",
  "lonely",
  "inject",
  "crazy",
  "crush",
  "delete",
];

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let visistedPos = [];
  let redCount = 9;
  let blueCount = 8;
  let yellowCount = 7;
  let blackCount = 1;
  let generatedMatrix = [];

  for (let i = 0; i < 25; i++) {
    let pos = getRandomizer(0, wordsArr.length - 1);

    while (visistedPos.includes(pos)) {
      pos = getRandomizer(0, wordsArr.length - 1);
    }
    console.log(pos);

    visistedPos.push(pos);
    let wordMatrix;

    if (redCount != 0) {
      wordMatrix = new WordMatrix({
        matrixId: uuidv1(),
        word: wordsArr[pos],
        gameId: req.params.gameId,
        color: TEAM.RED,
        marked: "N",
      });
      redCount--;
    } else if (blueCount != 0) {
      wordMatrix = new WordMatrix({
        matrixId: uuidv1(),
        word: wordsArr[pos],
        gameId: req.params.gameId,
        color: TEAM.BLUE,
        marked: "N",
      });
      blueCount--;
    } else if (yellowCount != 0) {
      wordMatrix = new WordMatrix({
        matrixId: uuidv1(),
        word: wordsArr[pos],
        gameId: req.params.gameId,
        color: TEAM.YELLOW,
        marked: "N",
      });
      yellowCount--;
    } else {
      wordMatrix = new WordMatrix({
        matrixId: uuidv1(),
        word: wordsArr[pos],
        gameId: req.params.gameId,
        color: TEAM.BLACK,
        marked: "N",
      });
      blackCount--;
    }
    await WordMatrix.create(wordMatrix, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the game.",
        });
      generatedMatrix.push(wordMatrix);
      if (i == 24) res.send(generatedMatrix);
    });
  }
};

exports.getwordMatrixByGameId = (req, res) => {
  WordMatrix.getwordMatrixByGameId(req.params.gameId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching word Matrix",
      });
    else {
      res.send(data);
    }
  });
};

exports.recordResponse = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  WordMatrix.updateById(
    new WordMatrix({ ...req.body, gameId: req.params.gameId }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.gameId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.gameId,
          });
        }
      } else res.send(data);
    }
  );
};
