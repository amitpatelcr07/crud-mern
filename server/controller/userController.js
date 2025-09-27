import User from "../model/userModel.js";

const addUsers = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        error: `User with email ${req.body.email} is already in the database`,
      });
    }

    // If not exists, create new user
    const user = new User(req.body);
    await user.save();
    console.log("User created:", user);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);    

    if (!user) {
      return res.status(404).send({ error: "User data not found" });
    }   

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }     
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }         
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }   
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);     
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    } 
    res.status(200).send({ message: "User deleted successfully" }); 
  } catch (err) {
    res.status(500).send({ error: err.message });
  } 
};
const userController = {
  addUsers,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userController;
