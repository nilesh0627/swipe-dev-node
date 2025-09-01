import express from "express";
import { userAuth } from "../middlewares/auth.js";

const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(
    `${user.firstName} sent the connection request to ${req.body.firstName}.`
  );
});

export { requestsRouter };
