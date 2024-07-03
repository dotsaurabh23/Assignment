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

const discussionSchema = new mongoose.Schema({
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const commentSchema = new mongoose.Schema({
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Discussion = mongoose.model('Discussion', discussionSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Like Post
app.post('/discussions/:id/like', async (req, res) => {
    const discussion = await Discussion.findById(req.params.id);
    const userId = req.body.userId;
    const index = discussion.likes.indexOf(userId);

    if (index > -1) {
        discussion.likes.splice(index, 1); // Unlike
    } else {
        discussion.likes.push(userId); // Like
    }

    await discussion.save();
    res.send(discussion);
});

// Like Comment
app.post('/comments/:id/like', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    const userId = req.body.userId;
    const index = comment.likes.indexOf(userId);

    if (index > -1) {
        comment.likes.splice(index, 1); // Unlike
    } else {
        comment.likes.push(userId); // Like
    }

    await comment.save();
    res.send(comment);
});

app.listen(3004, () => {
    console.log('Like Service listening on port 3004');
});
