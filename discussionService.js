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
    text: String,
    image: String,
    hashTags: [String],
    createdOn: { type: Date, default: Date.now },
    viewCount: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

// Create Discussion
app.post('/discussions', async (req, res) => {
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).send(discussion);
});

// Update Discussion
app.put('/discussions/:id', async (req, res) => {
    const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(discussion);
});

// Delete Discussion
app.delete('/discussions/:id', async (req, res) => {
    await Discussion.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Get List of Discussions by Tags
app.get('/discussions/tags', async (req, res) => {
    const tags = req.query.tags.split(',');
    const discussions = await Discussion.find({ hashTags: { $in: tags } });
    res.send(discussions);
});

// Get List of Discussions by Text
app.get('/discussions/search', async (req, res) => {
    const text = req.query.text;
    const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
    res.send(discussions);
});

app.listen(3002, () => {
    console.log('Discussion Service listening on port 3002');
});
