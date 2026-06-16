const Contact = require("../models/Contact");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return sendError(res, 400, "Name, email, and message are required");
  }

  const contact = await Contact.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  });

  return sendSuccess(res, 201, "Contact message saved successfully", contact);
});

module.exports = { createContact };
