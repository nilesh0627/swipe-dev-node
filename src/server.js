import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestsRouter } from "./routes/requests.js";

import "./config/database.js";
import { userRouter } from "./routes/user.js";

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

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

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
