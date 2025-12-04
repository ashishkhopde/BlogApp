import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
}, { timestamps: true });

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", userSchema);