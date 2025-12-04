import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./Config/connectDB.js";
import UserRoute from "./Routes/User.route.js";
import PostRoute from "./Routes/Post.route.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    return res.send("Server is live!");
});

app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);

app.listen(process.env.PORT, ()=>{
    console.log("listening...");
});