# swipe-dev-node

When you call mongoose.connect(...) in your connectDB function, you are telling Mongoose to connect to a specific MongoDB database.After this connection is established, all Mongoose models(like your User model) will use this connection by default.

Mongoose knows to save the user to the database you connected to in connectDB() because:

The connection is global within your Node.js process.
All models registered with Mongoose (mongoose.model('User', userSchema)) use this default connection unless you explicitly create and use a different one.

There is a difference between the expires option in res.cookie() and the expiresIn option in JWT (jwt.sign()):

# res.cookie() expires

Controls how long the cookie stays in the browser.
After the specified time/date, the browser deletes the cookie automatically.
Example: res.cookie("token", token, { expires: new Date(Date.now() + 3600000) }); // 1 hour

# jwt.sign() expiresIn

Controls how long the JWT token is valid.
After the specified time, the token is considered invalid by the server (even if the cookie still exists).
Example: const token = jwt.sign({ userId: user.\_id }, secret, { expiresIn: "1h" });

expires in res.cookie() = browser storage lifetime.
expiresIn in JWT = token validity for authentication.
