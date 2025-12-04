import mongoose from "mongoose";
import "dotenv/config"

export default function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connected..."))
    .catch((err)=>console.log("DB connection error: ", err))
}