import express from "express";
import { userAuth } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import { isEditProfileDataValid } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const EditReqFields = req.body;
    if (!isEditProfileDataValid(EditReqFields))
      throw new Error(`Invalid Edit request`);
    Object.keys(EditReqFields).forEach((field) => {
      loggedInUser[field] = EditReqFields[field];
    });
    // .save() validates the document, runs hooks/defaults, writes to DB, and returns the same updated instance.
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName},Your Profile is updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    user["password"] = passwordHash;
    await user.save();
    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

export { profileRouter };
