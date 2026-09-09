const express = require("express");
const { ObjectId } = require("mongodb");

const database = require("./connect.cjs");
const { hashPassword, comparePassword } = require("./passHash.cjs");

const usersRoutes = express.Router();

// Retrieve all users
usersRoutes.route("/users").get(async (req, res) => {
  try {
    const db = database.getDb();

    const users = await db
      .collection("Users")
      .find(
        {},
        {
          projection: {
            password: 0,
          },
        },
      )
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({
      error: "Failed to retrieve users",
    });
  }
});

// Retrieve one user
usersRoutes.route("/users/:id").get(async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = database.getDb();

    const user = await db.collection("Users").findOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        projection: {
          password: 0,
        },
      },
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({
      error: "Failed to retrieve user",
    });
  }
});

// Create one user
usersRoutes.route("/users").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }

    const db = database.getDb();

    // Check whether email already exists
    const existingUser = await db.collection("Users").findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const newUser = {
      email: email,
      password: hashedPassword,
      creationDate: new Date(),
    };

    const result = await db.collection("Users").insertOne(newUser);

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

// Update user password
usersRoutes.route("/users/:id").put(async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }

    const db = database.getDb();

    // Hash new password
    const hashedPassword = await hashPassword(password);

    const result = await db.collection("Users").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          password: hashedPassword,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({
      error: "Failed to update password",
    });
  }
});

// Delete one user
usersRoutes.route("/users/:id").delete(async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = database.getDb();

    const result = await db.collection("Users").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      error: "Failed to delete user",
    });
  }
});

//TEMPORARY

usersRoutes.route("/users/:id/test-password").get(async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const { password } = req.query;

    if (!password) {
      return res.status(400).json({
        error: "Password query parameter is required",
      });
    }

    const db = database.getDb();

    const user = await db.collection("Users").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    res.status(200).json({
      passwordMatch: isMatch,
    });
  } catch (err) {
    console.error("Error testing password:", err);

    res.status(500).json({
      error: "Failed to test password",
    });
  }
});

module.exports = usersRoutes;
