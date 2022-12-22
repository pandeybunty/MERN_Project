const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  st_sname: {
    type: String,
    required: true,
  },
  st_lname: {
    type: String,
    required: true,
  },
  st_dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  st_phone: {
    type: Number,
    required: true,
    unique: true,
  },
  st_email: {
    type: String,
    required: true,
    unique: true,
  },
  st_password: {
    type: String,
    required: true,
    unique: true,
  },
  st_confirmPassword: {
    type: String,
    required: true,
    unique: true,
  },
});

// save method ko call karne se pahle chalega..
employeeSchema.pre("save", async function (next) {
  if (this.isModified("st_password")) {
    //   const passwordEncryption = await bcryptjs.hash(st_password, 10);
    console.log(this.st_password);
    this.st_password = await bcryptjs.hash(this.st_password, 10);
    console.log(this.st_password);

    // this.st_confirmPassword = undefined;
  }
  next();
});

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
