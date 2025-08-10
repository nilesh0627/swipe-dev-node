import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nilesh0627:ZhljNUL99W8YeWDT@cluster0.bevehgb.mongodb.net/swipe-dev-node')
}

