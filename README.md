# swipe-dev-node


When you call mongoose.connect(...) in your connectDB function, you are telling Mongoose to connect to a specific MongoDB database.After this connection is established, all Mongoose models(like your User model) will use this connection by default.


Mongoose knows to save the user to the database you connected to in connectDB() because:

The connection is global within your Node.js process.
All models registered with Mongoose (mongoose.model('User', userSchema)) use this default connection unless you explicitly create and use a different one.
