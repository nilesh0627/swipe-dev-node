import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       minLength: 4,
//     },
//     lastName: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       validate(email) {
//         if (!validator.isEmail(email)) throw new Error("Not a valid email");
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       maxLength: 20,
//       minLength: 8,
//     },
//     age: {
//       type: Number,
//       min: 18,
//     },
//     gender: {
//       type: String,
//       validate(value) {
//         if (!["male", "female", "others"].includes(value?.toLowerCase())) {
//           throw new Error("Gender not valid");
//         }
//       },
//     },
//     skills: {
//       type: [String],
//       validate(skillsList) {
//         if (skillsList.length > 5) {
//           throw new Error("Maxium 5 skills can be added for a user");
//         }
//       },
//     },
//     about: {
//       type: String,
//       default: "Default value",
//     },
//     photoUrl: {
//       type: String,
//       validate(url) {
//         if (!validator.isURL(url)) throw new Error("Url not valid");
//       },
//     },
//     // address: {
//     //     street: { type: String },
//     //     city: { type: String },
//     //     state: { type: String },
//     //     zip: { type: String },
//     //     country: { type: String }
//     // }
//   },
//   {
//     timestamps: true,
//   }
// );

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "Default value",
    },
    photoUrl: {
      type: String,
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
