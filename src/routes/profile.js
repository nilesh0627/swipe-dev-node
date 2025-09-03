import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ALLOWED_FIELDS_TO_UPDATE } from "../utils/constants.js";
import { User } from "../models/user.js";
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
      message: "User details updated successfully",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

export { profileRouter };
