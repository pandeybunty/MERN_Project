var express = require("express");
var app = express();
var path = require("path");
const hbs = require("hbs");
const bcryptjs = require("bcryptjs");

require("./db/connection");
const Register = require("./models/register");

const port = process.env.PORT || 8000;

const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);


// registration get/read page functionalities..
app.get("/registration", (req, res) => {
  res.render("registration.hbs");
});

// registration post/create page functionalities..
app.post("/registration", async (req, res) => {
  try {
    const st_password = req.body.st_password;
    const st_confirmPassword = req.body.st_confirmPassword;
    if (st_password === st_confirmPassword) {
      const storeRegisterData = new Register({
        st_sname: req.body.st_sname,
        st_lname: req.body.st_lname,
        st_dob: req.body.st_dob,
        gender: req.body.gender,
        st_phone: req.body.st_phone,
        st_email: req.body.st_email,
        st_password: st_password,
        st_confirmPassword: st_confirmPassword,
      });

      // hasing algorithm functionalities.. !! using middleware !!
      // middleware ka matlab hota hai jo do chijo ke bich me work ho raha hai vaha kuch functions ko add karna..


      const registered = await storeRegisterData.save();
      res.status(201).render("index.hbs");
    } else {
      res.send("Please enter matching password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// home page functionalities..
app.get("/", (req, res) => {
  res.send("hello from the other side");
});


// login page functionalities..
app.get("/login", (req, res) => {
  res.render("login.hbs");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

   const studentEmail = await Register.findOne({st_email:email});
   console.log(studentEmail);

   const passwordMatch = await bcryptjs.compare(password, studentEmail.st_password);

    if(passwordMatch){
      res.status(201).render("index");
    } else{
      res.send("password are not matching");
    }

  } catch (error) {
    res.status(400).send("invalid login details");
  }
});

// listining port no..
app.listen(port, () => {
  console.log(`port no is http://localhost:${port}`);
});
