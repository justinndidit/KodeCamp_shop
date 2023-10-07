const { User } = require("../models/users");
const { signToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  try {
    const { fullName, username, password, role } = req.body;
    const user = await User.create({ fullName, username, password, role });
    user.password = undefined;

    const token = await signToken(user);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Wrong credentials, check username and password and try again",
      });
    }

    user.password = undefined;
    const token = await signToken(user);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id }, req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  getUser,
  getAllUsers,
  deleteUser,
  loginUser,
};
