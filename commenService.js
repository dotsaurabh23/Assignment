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

const commentSchema = new mongoose.Schema({
    text: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    discussionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' },
    createdOn: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Comment = mongoose.model('Comment', commentSchema);

// Add Comment
app.post('/discussions/:discussionId/comments', async (req, res) => {
    const comment = new Comment({ ...req.body, discussionId: req.params.discussionId });
    await comment.save();
    res.status(201).send(comment);
});

// Update Comment
app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(comment);
});

// Delete Comment
app.delete('/comments/:id', async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Reply to Comment
app.post('/comments/:id/reply', async (req, res) => {
    const reply = new Comment(req.body);
    await reply.save();

    const comment = await Comment.findById(req.params.id);
    comment.replies.push(reply._id);
    await comment.save();

    res.status(201).send(reply);
});

app.listen(3003, () => {
    console.log('Comment Service listening on port 3003');
});
