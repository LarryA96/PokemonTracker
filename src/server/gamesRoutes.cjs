const express = require("express");
const database = require("./connect.cjs");
const ObjectId = require("mongodb").ObjectId;

const gamesRoutes = express.Router();

// Retrieve all games
gamesRoutes.route("/games").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("Games").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("No games found");
  }
});

// Retrieve 1 game
gamesRoutes.route("/games/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("Games")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Game not found");
  }
});

/*
// Create 1 game
gamesRoutes.route("/games").post(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    releaseDate: new Date(),
  };
  let data = await db.collection("Games").insertOne(mongoObject);
  res.json(data);
});

// Update game information
gamesRoutes.route("/games/:id").put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      releaseDate: new Date(),
    },
  };
  let data = await db
    .collection("Games")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// Delete 1 game
gamesRoutes.route("/games/:id").delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("Games")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});
*/
module.exports = gamesRoutes;
