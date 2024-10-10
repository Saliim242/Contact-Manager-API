const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    contactName: {
      type: String,
      required: [true, "Please Enter Contact FullName"],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, "Please Enter Contact Email Address"],
      unique: true,
      lowercase: true, // Automatically converts email to lowercase
    },
    contactPhone: {
      type: String,
      required: [true, "Please Enter Contact Phone Number"],
      unique: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create the model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
