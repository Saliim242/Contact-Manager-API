const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");
//@desc Get All Contacts
//@route Get /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ status: true, message: contacts });
});

//@desc Get Single Contacts
//@route Get /api/contacts/:id
//@access Public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("The Contact is Not Found");
  }

  res.status(200).json({ status: true, message: contact });
});

//@desc Create new Contacts
//@route POST /api/contacts
//@access Public

const createContact = asyncHandler(async (req, res) => {
  const { contactName, contactEmail, contactPhone } = req.body;

  if (!contactName || !contactEmail || !contactPhone) {
    res.status(400);
    throw new Error("All Feilds Are Required");
  }

  const emailExists = await Contact.findOne({ contactEmail });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // Check if any phone number already exists
  const phoneExists = await Contact.findOne({
    contactPhone: { $in: contactPhone },
  });
  if (phoneExists) {
    res.status(400);
    throw new Error("One or more phone numbers already exist");
    // return res.status(400).json({
    //   status: false,
    //   message: "One or more phone numbers already exist",
    // });
  }

  const contact = await Contact.create({
    contactName,
    contactEmail,
    contactPhone,
    user_id: req.user.id,
  });

  res.status(201).json({ status: true, message: contact });
  //res.status(201).json(contact);
});

//@desc Update Contacts
//@route PUT /api/contacts/:id
//@access Public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id != req.user.id) {
    res.status(403);
    throw new Error("User does not have permession to updated other users");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: updatedContact,
  });
});

//@desc Delete Contacts
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id != req.user.id) {
    res.status(403);
    throw new Error("User does not have permession to delete other users data");
  }
  const deletedContact = await Contact.findByIdAndDelete(contact);
  // Return a success response if deleted
  res.status(200).json({
    status: true,
    message: "Contact deleted successfully",
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
