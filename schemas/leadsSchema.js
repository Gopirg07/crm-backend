const validator = require("validator");
const mongoose =require('mongoose')

let LeadsSchema = new mongoose.Schema(
  {
    leadName: { type: String, required: true },
    company: { type: String, required: true },    
    email: {
      type: String,
      required: true, 
      validate: (val) => {
        return validator.isEmail(val);
      },
    },
    phone: { type: String, default:"0000-00-0000" }, 
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: "leads",
    versionKey: false,
  }
);

let LeadsModel = mongoose.model("leads", LeadsSchema);

module.exports = { LeadsModel };
