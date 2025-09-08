import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
import "../config/env.js";

const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req, res) => {
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

userRouter.get("/user/connections", userAuth, async (req, res) => {
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
console.log(process.env.NODE_ENV);
// this route is only for debugging
if (process.env.NODE_ENV === "development") {
  userRouter.get("/allconnections", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
      const connectionsList = await ConnectionRequest.find({
        $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      });
      res.json({ connectionsList });
    } catch (err) {
      res.status(400).json({ message: `ERROR: ${err.message}` });
    }
  });
}

export { userRouter };
