const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const Friends = require("../model/friends");
const { findByIdAndUpdate } = require("../model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "UserName already used",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        msg: "Email already exists",
        status: false,
      });
    }
    const friends = await Friends.create({
      friends: [],
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      friends: friends._id,
    });

    delete user.password;
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log("In here");
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      delete user.password;
      if (isPasswordValid) {
        return res.json({
          status: true,
          user,
        });
      }
      return res.json({
        status: false,
        msg: "Username or passsword incorrect",
      });
    }
    return res.json({
      status: false,
      msg: "Username or passsword incorrect",
    });
  } catch (error) {
    return res.json({
      msg: "Some error at our end",
      status: false,
      error,
    });
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
      isAvatarImageSet: true,
      avatarImage: req.body.image,
    });
    await user.save();
    const userTemp = await User.findById(id);
    return res.json({
      isSet: userTemp.isAvatarImageSet,
      image: userTemp.avatarImage,
    });
  } catch (error) {
    return res.json({
      msg: "Some error occured",
      status: false,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const friends = await Friends.findById(user.friends).populate(
      "friends",
      "username email avatarImage _id"
    );

    return res.json({
      status: true,
      users: friends,
    });
  } catch (error) {
    return res.json({
      msg: "Some Error occured at our end",
      status: false,
    });
  }
};

module.exports.getTotalUsers = async (req, res) => {
  const users = await User.find({});
  const total = users.length;
  return res.json({
    status: true,
    totalUsers: total,
  });
};

module.exports.searchUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const value = req.params.value;
    const requestedUsers = await users.filter((user) => {
      return user.username.toLowerCase().startsWith(value.toLowerCase());
    });
    return res.json({
      status: true,
      users: requestedUsers.slice(0, 15),
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error,
    });
  }
};

module.exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const userDetails = {
      avatarImage: user.avatarImage,
      email: user.email,
      username: user.username,
      _id: user._id,
      socialMedia: user.socialMedia,
      about: user.about,
    };
    if (user) {
      return res.json({
        status: true,
        user: userDetails,
      });
    }

    return res.json({
      status: false,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "some error occured at our end",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const work_email = req.body.workEmail;
    const linkedin = req.body.linkedin;
    const github = req.body.github;
    const twitter = req.body.twitter;
    const id = req.body.id;

    const user = await User.findById(id);
    if (user) {
      const user = await User.findByIdAndUpdate(id, {
        socialMedia: {
          linkedin,
          github,
          twitter,
          work_email,
        },
      });

      await user.save();
      return res.json({
        status: true,
      });
    }
    return res.json({
      status: false,
    });
  } catch (error) {
    return res.json({
      status: false,
    });
  }
};

module.exports.updateAbout = async (req, res) => {
  try {
    const id = req.body.id;
    const about = req.body.about;

    const user = await User.findByIdAndUpdate(id, {
      about: about,
    });

    await user.save();

    return res.json({
      status: true,
      about: about,
    });

  } catch (error) {
    return res.json({
      status: false,
    });
  }
};
