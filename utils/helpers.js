function getRandomizer(bottom, top) {
  return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

module.exports = { getRandomizer };
