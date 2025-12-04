import UserModel from "../Models/User.model.js";


export const registerUser = async (req, res) => {
  try {
    const data = req.body;

    let user = await UserModel.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = await UserModel.create(data);

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
      token: user.generateAuthToken(),
    });
  } catch (err) {
    console.log("Register Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    if (!await user.comparePassword(password)) {
      return res.json({ message: "Incorrect password" });
    }

    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
      token: user.generateAuthToken(),
    });
    
  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const getUserData = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).populate("posts").sort({createdAt: -1});
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    return res.status(200).json({
      message: "User data",
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        posts: user.posts || [],
      }
    });
  } catch (err) {
    console.log("GetUserData Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
