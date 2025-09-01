import express from "express";
import bcrypt from "bcrypt";
import { signUpDataValidation } from "../utils/validation.js";
import { User } from "../models/user.js";

const authRouter = express.Router();

/* When you call mongoose.connect(...) in your connectDB function, you are telling Mongoose to connect to a specific MongoDB database.After this connection is established, all Mongoose models(like your User model) will use this connection by default.
 */
authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

export { authRouter };
