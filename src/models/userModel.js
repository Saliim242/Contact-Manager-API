const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add the user fullName"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please add the user email address"],
      trim: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Please add the user phone number"],
    },

    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
