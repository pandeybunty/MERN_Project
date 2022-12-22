const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/intersalaRegistrationForm")
.then(() =>{
     console.log("connection is sucessfull");
}).catch((error) =>{
  console.log(error);
})