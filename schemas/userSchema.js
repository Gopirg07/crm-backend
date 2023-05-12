const validator = require("validator");
const mongoose =require('mongoose')
let UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "user" },    
    email: {
      type: String,
      required: true, 
      validate: (val) => {
        return validator.isEmail(val);
      },
    },
    password: { type: String, required: true },
    phone: { type: String, default: "0000-00-0000" },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

let UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel };
