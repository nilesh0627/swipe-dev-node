import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { ALLOWED_FIELDS_TO_UPDATE } from "./utils/constants.js";

import "./config/database.js";
import { signUpDataValidation } from "./utils/validation.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// a middleware in Express that parses incoming requests with JSON payloads.
// It automatically reads the body of incoming HTTP requests(like POST or PUT) if they have a Content - Type: application/json header.
// It parses the JSON data and attaches it to req.body, so you can easily access the submitted data in your route handlers.
app.use(express.json());

// When you call mongoose.connect(...) in your connectDB function, you are telling Mongoose to connect to a specific MongoDB database.After this connection is established, all Mongoose models(like your User model) will use this connection by default.
app.post("/signup", async (req, res) => {
  try {
    signUpDataValidation(req.body);
    const {
      firstName,
      lastName,
      gender,
      skills,
      age,
      password,
      photoUrl,
      email,
      about,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      gender,
      skills,
      age,
      photoUrl,
      email,
      about,
      password: passwordHash,
    });
    await user.save();
    res.send(`user signedup successfully`);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.query.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) res.status(404).send("User not found");
    else res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    Object.keys(req.body).forEach((key) => {
      if (!ALLOWED_FIELDS_TO_UPDATE.includes(key))
        throw new Error(`Update not allowed for the ${key} field.`);
    });
    // By default, findOneAndUpdate returns the document as it was before the update.Setting new: true makes it return the document after the update.
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!user) res.send("User not found");
    else res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const { id: userId } = req.body;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) res.send("User not found");
    else res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Error while fetching users");
  }
});

connectDB()
  .then(async () => {
    console.log("DB Connection Successful");
    await User.syncIndexes();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });
