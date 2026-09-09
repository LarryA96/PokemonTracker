//File path relative to app loading at the PokemonProject root
require("dotenv").config({ path: "./src/server/config.env" });
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Create and store database connection for use in other files
let database;
module.exports = {
  connectToServer: async () => {
    await client.connect();
    database = client.db("PokemonProject");
  },
  getDb: () => {
    return database;
  },
};
