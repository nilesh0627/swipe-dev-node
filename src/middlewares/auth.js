import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { isEmpty } from "../utils/helper.js";

export const userAuth = async (req, res, next) => {
  try {
    // get the cookies
    const cookies = req.cookies;
    //get the token from cookie
    const token = cookies.token;
    const authSecretKey = process.env.AUTH_SECRET_KEY;
    if (isEmpty(token)) throw new Error("Invalid Token");
    // verify the token
    const decodedTokenObject = jwt.verify(token, authSecretKey);
    //get the userid
    const userId = decodedTokenObject.userId;
    // check if the user id exists
    const user = await User.findById(userId);
    if (isEmpty(user)) throw new Error("User not found");
    else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(404).send(`ERROR: ${err.message}`);
  }
};
