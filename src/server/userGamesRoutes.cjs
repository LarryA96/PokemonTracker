const express = require("express");
const { ObjectId } = require("mongodb");

const database = require("./connect.cjs");

const userGamesRoutes = express.Router();
