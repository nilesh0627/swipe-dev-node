import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";

const userRouter = express.Router();

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    });
    res.json({ receivedRequests });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionsList = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "accepted",
    });
    res.json({ connectionsList });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

export { userRouter };
