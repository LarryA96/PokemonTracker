const { connectToServer } = require("./connect.cjs");
const express = require("express");
const cors = require("cors");
const users = require("./usersRoutes.cjs");
const games = require("./gamesRoutes.cjs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(users);
app.use(games);

async function startServer() {
  try {
    await connectToServer();

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

startServer();
