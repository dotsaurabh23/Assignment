// userService.js
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

(async () => {
try {
     await mongoose.connect("mongodb://localhost:27017/discussionApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to MongoDB');
} catch (error) {
    console.log('error while connecting the db ' , error);
}
}
)()

// database schema
const userSchema = new mongoose.Schema({
  name: String,
  mobileNo: { type: String, unique: true },
  email: { type: String, unique: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

// Create User
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// Update User
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Show List of Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Search User by Name
app.get("/users/search", async (req, res) => {
  const users = await User.find({ name: new RegExp(req.query.name, "i") });
  res.send(users);
});

// Follow/Unfollow User
app.post("/users/:id/follow", async (req, res) => {
  const user = await User.findById(req.params.id);
  const followerId = req.body.followerId;
  const index = user.following.indexOf(followerId);

  if (index > -1) {
    user.following.splice(index, 1); // Unfollow
  } else {
    user.following.push(followerId); // Follow
  }

  await user.save();
  res.send(user);
});

app.listen(3000, () => {
  console.log("User Service listening on port 3000");
});
