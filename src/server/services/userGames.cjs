const database = require("../connect.cjs");

// Create UserGames entries for a newly created user
async function initializeUserGames(userId) {
  const db = database.getDb();

  // Get every game
  const games = await db.collection("Games").find({}).toArray();

  // Create one UserGames document for each game
  const userGames = games.map((game) => ({
    userId: userId,
    gameId: game._id,
    status: "not_started",
    notes: "",
    isFavorite: false,
  }));

  // Insert all UserGames documents
  if (userGames.length > 0) {
    await db.collection("UserGames").insertMany(userGames);
  }

  return userGames.length;
}

module.exports = {
  initializeUserGames,
};
