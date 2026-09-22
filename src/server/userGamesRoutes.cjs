const express = require("express");
const { ObjectId } = require("mongodb");

const database = require("./connect.cjs");

const userGamesRoutes = express.Router();

// Update a user's game status, notes, and favorite
userGamesRoutes.route("/userGames/:userId/:gameId").put(async (req, res) => {
  try {
    const { userId, gameId } = req.params;
    const { status, notes, isFavorite } = req.body;

    // Validate user ID
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    // Validate status
    const validStatuses = ["not_started", "in_progress", "complete"];

    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    // Validate notes
    if (notes !== undefined && typeof notes !== "string") {
      return res.status(400).json({
        error: "Notes must be a string",
      });
    }

    // Validate favorite
    if (isFavorite !== undefined && typeof isFavorite !== "boolean") {
      return res.status(400).json({
        error: "isFavorite must be a boolean",
      });
    }

    const db = database.getDb();

    const userObjectId = new ObjectId(userId);

    // Build the fields that should be updated
    const updateFields = {};

    if (status !== undefined) {
      updateFields.status = status;
    }

    if (notes !== undefined) {
      updateFields.notes = notes;
    }

    if (isFavorite !== undefined) {
      updateFields.isFavorite = isFavorite;
    }

    // Make sure there is actually something to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        error: "Status, notes, or favorite are required",
      });
    }

    // If this game is being favorited,
    // remove the favorite from any other game belonging to this user
    if (isFavorite === true) {
      await db.collection("UserGames").updateMany(
        {
          userId: userObjectId,
          isFavorite: true,
          gameId: { $ne: gameId },
        },
        {
          $set: {
            isFavorite: false,
          },
        },
      );
    }

    // Update the requested game
    const result = await db.collection("UserGames").updateOne(
      {
        userId: userObjectId,
        gameId: gameId,
      },
      {
        $set: updateFields,
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "UserGame not found",
      });
    }

    // Get the updated game so the response always contains
    // the actual current favorite value
    const updatedGame = await db.collection("UserGames").findOne({
      userId: userObjectId,
      gameId: gameId,
    });

    res.status(200).json({
      message: "UserGame updated successfully",
      isFavorite: updatedGame.isFavorite,
    });
  } catch (err) {
    console.error("Error updating UserGame:", err);

    res.status(500).json({
      error: "Failed to update UserGame",
    });
  }
});

// Get all games for a user
userGamesRoutes.route("/userGames/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = database.getDb();

    const userGames = await db
      .collection("UserGames")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Games",
            localField: "gameId",
            foreignField: "_id",
            as: "game",
          },
        },
        {
          $unwind: "$game",
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            gameId: 1,
            status: 1,
            notes: 1,
            isFavorite: 1,
            name: "$game.name",
            generation: "$game.generation",
            CoverArtURL: "$game.CoverArtURL",
          },
        },
      ])
      .toArray();

    res.status(200).json(userGames);
  } catch (err) {
    console.error("Error retrieving user games:", err);

    res.status(500).json({
      error: "Failed to retrieve user games",
    });
  }
});

// Get the favorite game for a user
userGamesRoutes.route("/userGames/:userId/favorite").get(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = database.getDb();

    const favoriteGame = await db
      .collection("UserGames")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
            isFavorite: true,
          },
        },
        {
          $lookup: {
            from: "Games",
            localField: "gameId",
            foreignField: "_id",
            as: "game",
          },
        },
        {
          $unwind: "$game",
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            gameId: 1,
            status: 1,
            notes: 1,
            isFavorite: 1,
            name: "$game.name",
            generation: "$game.generation",
            CoverArtURL: "$game.CoverArtURL",
          },
        },
      ])
      .toArray();

    if (favoriteGame.length === 0) {
      return res.status(200).json(null);
    }

    res.status(200).json(favoriteGame[0]);
  } catch (err) {
    console.error("Error retrieving favorite game:", err);

    res.status(500).json({
      error: "Failed to retrieve favorite game",
    });
  }
});

module.exports = userGamesRoutes;
