var express = require("express");
var router = express.Router();
const { dbUrl } = require("../common/dbConfig");
const { ContactsModel} = require("../schemas/contactsSchema");
const mongoose = require("mongoose");

mongoose.connect(dbUrl);

/* GET home page. */
//GET ALL
router.get("/getAllContacts", async (req, res, next) => {
  try {
    let contacts = await ContactsModel.find();
    res.status(200).send({ message: "All Contacts Data Are Fetched",contacts });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//CREATE
router.post("/createContact", async (req, res, next) => {
  try {
    let contact = await ContactsModel.create(req.body);
    res.status(200).send({ message: "Contact Created Successfully!!!",contact});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});


//DELETE
router.delete("/deleteContact/:id", async (req, res, next) => {
  try {
    let contact = await ContactsModel.deleteOne({_id:req.params.id});
    res.status(200).send({ message: "Contact Deleted Successfully!!!",contact});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

module.exports = router;

