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

# General Rule of Thumb

## Use .save() when:

You need hooks/middleware to run (pre/post save, password hashing, timestamps).
You want full validation + defaults applied.
You’re dealing with sensitive fields (password, role, email, etc.).
You want to work with the document instance in memory before persisting.

## Use findByIdAndUpdate / updateOne when:

It’s a simple, non-sensitive update (like updating lastLogin, viewCount, or bio).
You want a fast, direct update query (skips loading the doc).
You don’t need middleware/defaults.
You explicitly enable { runValidators: true } if you want schema validation.

## 📌 ref + populate in Mongoose

🔹 ref in Mongoose
In Mongoose, ref is used to create a relationship between documents in different collections.
👉 It tells Mongoose:
“Hey, this field stores the ObjectId of a document from another collection.”

✅ In short:
ref: defines which model an ObjectId refers to.
populate: fetches the related document(s) and replaces the ObjectId with actual data.

// User Schema
const userSchema = new mongoose.Schema({
name: String,
});
const User = mongoose.model("User", userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
title: String,
author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // 👈 ref
});
const Post = mongoose.model("Post", postSchema);

👉 Insert Data
const user = await User.create({ name: "Nilesh" });
await Post.create({ title: "Hello World", author: user.\_id });

👉 Query Without Populate
const post = await Post.findOne();
console.log(post);

Output:

{
"title": "Hello World",
"author": "64fa..." // only ObjectId
}

👉 Query With Populate
const post = await Post.findOne().populate("author");
console.log(post);

Output:

{
"title": "Hello World",
"author": { "\_id": "64fa...", "name": "Nilesh" } // 👈 full user doc
}

✅ Summary:

ref → defines relationship (author points to a User).
populate → replaces the ObjectId with the actual User document.
