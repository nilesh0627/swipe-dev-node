import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    // address: {
    //     street: { type: String },
    //     city: { type: String },
    //     state: { type: String },
    //     zip: { type: String },
    //     country: { type: String }
    // }
})

const User = mongoose.model('User', userSchema)

export { User }