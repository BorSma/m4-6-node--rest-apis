"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { clientsList } = require("./handlers/clientHandlers");
const { clientById } = require("./handlers/clientHandlers");
const { clientAdd } = require("./handlers/clientHandlers");
const { clientDel } = require("./handlers/clientHandlers");

const { wordPick } = require("./handlers/hangmanHandlers");
const { letterGuess } = require("./handlers/hangmanHandlers");


express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get("/customers", clientsList)
  .get("/customer/:id", clientById)
  .post("/customeradd/", clientAdd)
  .post("/customerdel/", clientDel)

  .get("/hangman/word/:id", wordPick)
  .get("/hangman/word/", wordPick)
  .get("/hangman/guess/:id/:letter", letterGuess)
  
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })
 

  .listen(8000, () => console.log(`Listening on port 8000`));
