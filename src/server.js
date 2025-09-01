import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

import { userAuth } from "./middlewares/auth.js";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

import "./config/database.js";
import { signUpDataValidation } from "./utils/validation.js";

// loads environment variables from your .env file into process.env.
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

/* 
 a middleware in Express that parses incoming requests with JSON payloads.
 It automatically reads the body of incoming HTTP requests(like POST or PUT) if they have a Content - Type: application/json header.
It parses the JSON data and attaches it to req.body, so you can easily access the submitted data in your route handlers.
*/
app.use(express.json());

// Parses cookies from incoming requests and makes them available as req.cookies in route handlers.
app.use(cookieParser());

/* When you call mongoose.connect(...) in your connectDB function, you are telling Mongoose to connect to a specific MongoDB database.After this connection is established, all Mongoose models(like your User model) will use this connection by default.
 */
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).send(`Invalid Credentials`);
    const isAuthorizedUser = await user.validatePassword(password);
    if (isAuthorizedUser) {
      const token = await user.getJWT();
      /* 
      expires in res.cookie sets the exact date and time when the cookie will expire and be removed from the browser. After the expires date, the browser deletes the cookie automatically.

      httpOnly in res.cookie means the cookie cannot be accessed or modified by JavaScript running in the browser (i.e., it is not available via document.cookie). Only the server can read or set this cookie, which helps protect it from cross-site scripting (XSS) attacks.

      expires in res.cookie() = browser storage lifetime.
      expiresIn in JWT = token validity for authentication.
       */
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
        httpOnly: true,
      });
      res.send("Login Successful");
    } else throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(
    `${user.firstName} sent the connection request to ${req.body.firstName}.`
  );
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
