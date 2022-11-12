const Friends = require("../model/friends");
const User = require("../model/userModel");
module.exports.addFriend = async (req, res) => {
  try {
    const fromUser = req.query.fromId;
    const toId = req.query.toId;
    const user = await User.findById(fromUser);
    const toUser = await User.findById(toId);

    const friends = await Friends.findById(user.friends);
    if (friends.friends.includes(toUser._id)) {
      return res.json({
        status: false,
        msg: "The user is already in your friend list",
        isFriend: true,
      });
    } else {
      await friends.friends.push(toUser);
      await friends.save();
      const toFriends = await Friends.findById(toUser.friends);
      await toFriends.friends.push(user);
      await toFriends.save();
    }

    return res.json({
      status: true,
      msg: "Friend Added",
      isFriend: true,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Some error occured at our end",
      isFriend: false,
    });
  }
};

module.exports.removeFriend = async (req, res) => {};
