var express = require("express");
var router = express.Router();
const { dbUrl } = require("../common/dbConfig");
const { LeadsModel } = require("../schemas/leadsSchema");
const mongoose = require("mongoose");

mongoose.connect(dbUrl);

/* GET home page. */
//GET ALL
router.get("/getAllLeads", async (req, res, next) => {
  try {
    let leads = await LeadsModel.find();
    res.status(200).send({ message: "All Leads Data Are Fetched",leads });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

//CREATE
router.post("/createLead", async (req, res, next) => {
  try {
    let lead = await LeadsModel.create(req.body);
    res.status(200).send({ message: "Lead Created Successfully!!!",lead});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});


//DELETE
router.delete("/deleteLead/:id", async (req, res, next) => {
  try {
    let lead = await LeadsModel.deleteOne({_id:req.params.id});
    res.status(200).send({ message: "Lead Deleted Successfully!!!",lead});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

module.exports = router;
