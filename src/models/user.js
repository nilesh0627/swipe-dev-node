import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ABOUT,
  AGE,
  EMAIL,
  FIRST_NAME,
  GENDER,
  LAST_NAME,
  PASSWORD,
  PHOTO_URL,
  SKILLS,
} from "../utils/constants.js";
import { validateUserInfoField } from "../utils/validation.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    [FIRST_NAME]: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      validate: (value) => validateUserInfoField(FIRST_NAME, value, true),
    },
    [LAST_NAME]: {
      type: String,
      minLength: 1,
      maxLength: 20,
      validate: (value) => validateUserInfoField(LAST_NAME, value, false),
    },
    [EMAIL]: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: (value) => validateUserInfoField(EMAIL, value, true),
    },
    [PASSWORD]: {
      type: String,
      required: true,
    },
    [AGE]: {
      type: Number,
      min: 18,
      validate: (value) => validateUserInfoField(AGE, value, false),
    },
    [GENDER]: {
      type: String,
      validate: (value) => validateUserInfoField(GENDER, value, false),
    },
    [SKILLS]: {
      type: [String],
      validate: (value) => validateUserInfoField(SKILLS, value, false),
    },
    [ABOUT]: {
      type: String,
      default: "Default value",
      validate: (value) => validateUserInfoField(ABOUT, value, false),
    },
    [PHOTO_URL]: {
      type: String,
      validate: (value) => validateUserInfoField(PHOTO_URL, value, false),
    },
    // address: {
    //     street: { type: String },
    //     city: { type: String },
    //     state: { type: String },
    //     zip: { type: String },
    //     country: { type: String }
    // }
  },
  {
    timestamps: true,
  }
);

// normal function, not an arrow function since we are using this inside
userSchema.methods.getJWT = async function () {
  const user = this;
  const authSecretKey = process.env.AUTH_SECRET_KEY;
  const token = await jwt.sign({ userId: user._id }, authSecretKey, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isAuthorizedUser = await bcrypt.compare(password, user.password);
  return isAuthorizedUser;
};

/* 
mongoose.model() always uses the default connection unless you explicitly create a different connection with mongoose.createConnection().
All queries (User.findOne(), User.save(), etc.) will use the database specified in your default connection string.

The default connection string refers to the MongoDB URI you provide when you call:
await mongoose.connect(process.env.DB_CONNECTION_STRING);

This string (usually stored in your .env file as DB_CONNECTION_STRING) tells Mongoose which MongoDB database to connect to.
All models created with mongoose.model() will use this connection by default.
*/
const User = mongoose.model("User", userSchema);

export { User };
