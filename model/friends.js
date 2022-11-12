const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema({
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friends = mongoose.model("Friends", FriendsSchema);
module.exports = Friends;
