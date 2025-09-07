import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
import mongoose from "mongoose";
import { User } from "../models/user.js";

const requestsRouter = express.Router();

// This route will only handle the logic of left and right swipes i.e. interested and ignored
requestsRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      // Only right and left swipes (interested/ignored) allowed
      if (!["interested", "ignored"].includes(status))
        return res
          .status(400)
          .json({ message: `${status} is invalid for connection request` });

      // check if touserid exists in db
      const toUser = await User.findById(toUserId);
      if (!toUser)
        return res.status(400).json({ message: "User doesn't exists" });

      // check if the connection has been already sent by sender to receiver or vice-versa.
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest)
        return res
          .status(400)
          .json({ message: "Connection request already exists" });

      const newRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await newRequest.save();
      return res.json({
        message: status === "interested" ? "Liked" : "Passed",
        data,
      });
    } catch (err) {
      res.status(400).send({ message: `ERROR: ${err.message}` });
    }
  }
);

export { requestsRouter };
