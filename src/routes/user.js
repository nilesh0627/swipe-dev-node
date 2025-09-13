import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
import "../config/env.js";
import { User } from "../models/user.js";
import { USER_FIELDS_TO_SHARE } from "../utils/constants.js";

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
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

    //get the list of connections which has the status of accepted and the id involves the loggedin user either as sender or receiver
    const connectionsList = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
        },
        {
          fromUserId: loggedInUser._id,
        },
      ],
      status: "accepted",
    })
      .populate("fromUserId", USER_FIELDS_TO_SHARE)
      .populate("toUserId", USER_FIELDS_TO_SHARE);
    // if the loggedInUser has sent the connection request then return the receiver profile or else if loggedInUser has received the connection request then get the sender profile
    const responseData = connectionsList.map((connection) => {
      if (connection.fromUserId._id.equals(loggedInUser._id)) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });

    res.json({ responseData });
  } catch (err) {
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});

/*
idea is to get the loggedInUser current connections (i.e. interested/ignored/accepted/rejected) and then get the connection user ids list 
and then fetch the users from User collection by excluding those users which exists in loggedInUser connection user ids list 
*/
userRouter.get("/user/feed", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserConnections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });
    // get the user ids who have sent connection requests to loggedin user or the users who have received connections from logged in user
    const loggedInUserConnectionIds = loggedInUserConnections.map(
      (connection) => {
        if (connection.fromUserId.equals(loggedInUser._id)) {
          return connection.toUserId;
        }
        return connection.fromUserId;
      }
    );
    // add the loggedInUser id in the list so feed users can be filtered
    loggedInUserConnectionIds.push(loggedInUser._id);
    const users = await User.find({
      _id: { $nin: loggedInUserConnectionIds },
    });
    res.json({ users });
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
