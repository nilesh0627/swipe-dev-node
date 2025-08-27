import mongoose from "mongoose";
import validator from "validator";
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

const User = mongoose.model("User", userSchema);

export { User };
