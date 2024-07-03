import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

//database connection 
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

const userSchema = new mongoose.Schema({
    name: String,
    mobileNo: { type: String, unique: true },
    email: { type: String, unique: true }
});

const discussionSchema = new mongoose.Schema({
    text: String,
    hashTags: [String]
});

const User = mongoose.model('User', userSchema);
const Discussion = mongoose.model('Discussion', discussionSchema);

// Search Users
app.get('/search/users', async (req, res) => {
    const name = req.query.name;
    const users = await User.find({ name: new RegExp(name, 'i') });
    res.send(users);
});

// Search Discussions by Text
app.get('/search/discussions', async (req, res) => {
    const text = req.query.text;
    const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
    res.send(discussions);
});

// Search Discussions by Hashtags
app.get('/search/discussions/tags', async (req, res) => {
    const tags = req.query.tags.split(',');
    const discussions = await Discussion.find({ hashTags: { $in: tags } });
    res.send(discussions);
});

app.listen(3005, () => {
    console.log('Search Service listening on port 3005');
});
