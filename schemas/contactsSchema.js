const validator = require("validator");
const mongoose = require("mongoose");
let ContactsSchema = new mongoose.Schema(
  {
    contactName: { type: String, required: true },
    accountName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: (val) => {
        return validator.isEmail(val);
      },
    },
    phone: { type: String, default: "0000-00-0000" },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: "contacts",
    versionKey: false,
  }
);

let ContactsModel = mongoose.model("contacts", ContactsSchema);

module.exports = { ContactsModel };