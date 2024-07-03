
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

const secretKey = 'RANDOMNAME';  // should be saved in the .env file 

// Sign Up
app.post('/auth/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).send(user);
});

// Login
app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.send({ token });
});

app.listen(3001, () => {
    console.log('Auth Service listening on port 3001');
});
