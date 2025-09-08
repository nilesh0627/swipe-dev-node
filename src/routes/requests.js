import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
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

/*
requestId is the _id of each connection request.
*/
requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        return res.status(400).json({ message: "Invalid review status" });
      /* using findOne so i can filter out the ignore, once a user is ignored then that can't be accepted/rejected.
       if i am the logged in user then i can only see who all are interested in me and i can either accept/reject at a time by using requestId
      */
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest)
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: status === "accepted" ? "Accepted!! It's a match" : "Rejected",
        data,
      });
    } catch (err) {
      res.status(400).json({ message: `ERROR: ${err.message}` });
    }
  }
);

export { requestsRouter };
