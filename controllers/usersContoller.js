const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const Friends = require("../model/friends");
const Mailjet = require("node-mailjet");
const EmailVerification = require("../model/emailVerification");
require("dotenv").config();

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, codeId, code } = req.body;

    const emailVerification = await EmailVerification.findById(codeId);
    if (!emailVerification || emailVerification.code !== code) {
      await EmailVerification.findByIdAndDelete(codeId);
      return res.json({
        msg: "Invalid code",
        status: false,
      });
    }
    await EmailVerification.findByIdAndDelete(codeId);

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
        msg: "This email is already registered",
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
      socialMedia: {
        work_email: email,
        linkedin: "Please update your linkedin handle",
        github: "Please update your github handle",
        twitter: "Please update your twitter handle",
      },
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

// Sending email verification link to the user
module.exports.sendEmailVerificationLink = async (req, res) => {
  const mailjet = await Mailjet.apiConnect(
    process.env.MAILJET_PUBLIC_KEY,
    process.env.MAILJET_SECRET_KEY
  );

  const email = req.body.email;
  const username = req.body.username;

  const registeredUser = await User.findOne({ email: email });

  if (registeredUser) {
    return res.json({
      status: false,
      msg: "Email already registered with us",
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  const codeId = await EmailVerification.create({
    code: code,
  });

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "teamsocialify@gmail.com",
            Name: "ChatHub",
          },
          To: [
            {
              Email: email,
              Name: username,
            },
          ],
          Subject: "Email Verification",
          TextPart: "Email Verification",
          HTMLPart: `<h3>Dear ${username}, 
          use this code to verify your email address: ${code}
          </h3>`,
        },
      ],
    });

    return res.json({ status: true, msg: "Email Sent", codeId: codeId._id });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "An error occured while sending message" });
  }
};

// Verifying the email for password reset
module.exports.sendEmailVerificationLinkForResetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.json({
      status: false,
      msg: "This email is not registered with us",
    });
  }

  const mailjet = await Mailjet.apiConnect(
    process.env.MAILJET_PUBLIC_KEY,
    process.env.MAILJET_SECRET_KEY
  );

  const code = Math.floor(100000 + Math.random() * 900000);
  const codeId = await EmailVerification.create({
    code: code,
  });

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "teamsocialify@gmail.com",
            Name: "ChatHub",
          },
          To: [
            {
              Email: email,
              Name: user.username,
            },
          ],
          Subject: "Email Verification",
          TextPart: "Email Verification",
          HTMLPart: `<h3>Dear ${user.username},
          use this code to verify your email address: ${code} for password reset
          </h3>`,
        },
      ],
    });

    return res.json({
      status: true,
      msg: "Email Sent",
      codeId: codeId._id,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "An error occured while sending email",
    });
  }
};

// Passowrd reset
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, codeId, code, password } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.json({
        status: false,
        msg: "This email is not registered with us",
      });
    }

    const emailVerification = await EmailVerification.findById(codeId);

    if (emailVerification.code === code) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });

      await updatedUser.save();

      return res.json({
        status: true,
        msg: "Password reset successful",
      });
    } else {
      return res.json({
        status: false,
        msg: "Invalid code",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "An error occured",
    });
  }
};

// Delete user
module.exports.deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
      const friendsId = user.friends;
      const friends = await Friends.findById(friendsId);
      // console.log("Friends arrray",friends.friends);

      for (let i = 0; i < friends.friends.length; i++) {
        const _id = friends.friends[i];
        // console.log("id",_id);
        const tempUser = await User.findById(_id);
        const tempFriends = await Friends.findById(tempUser.friends);
        const index = tempFriends.friends.indexOf(id);
        if (index > -1) {
          tempFriends.friends.splice(index, 1);
        }
        await tempFriends.save();
      }
      await Friends.findByIdAndDelete(friendsId);
      await User.findByIdAndDelete(id);

      return res.json({
        status: true,
        msg: "Account deleted successfully",
      });
    } else {
      return res.json({
        status: false,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      msg: "An error occured",
    });
  }
};
