const e = require("express");
const { words } = require("../data/words");

const wordPick = (req, res) => {
  let wordLocationArr = [];
  if (req.params.id === undefined) {
    let randNum = Math.floor(Math.random() * words.length);
    res.status(200).json({
      status: 200,
      data: { id: words[randNum].id, letterCount: words[randNum].letterCount },
    });
  } else
    wordLocationArr = words.map((word) => {
      if (word.id === req.params.id) return 1;
      else return 0;
    });
  let wordLocation = wordLocationArr.indexOf(1);
  res.status(200).json({
    status: 200,
    data: words[wordLocation],
  });
};

const letterGuess = (req, res) => {
  let word = words.filter((word) => word.id === req.params.id)
  let wordArr = word[0].word.split("");
  let newWordArr = wordArr.map(letter => letter.toLowerCase() === req.params.letter.toLowerCase());
  res.status(200).json({ status: 200, data: newWordArr });
};

module.exports = { wordPick, letterGuess };
