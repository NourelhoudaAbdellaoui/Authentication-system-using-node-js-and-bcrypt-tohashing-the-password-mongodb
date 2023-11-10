const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
//import model from the config file which contain the collection name  (in the magodb ) and the schema

const collection = require("./config");
const User = require("./config");
//

const app = express();
// convert data to json Format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// the EJS as the view engine
app.set("view engine", "ejs");

// static file to make the changes of the style to the .ejs
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
// create a user
app.post("/signup", async (req, res) => {
  console.log(req.body);

  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  // check if user already exists in the database
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists. please choose a different username. ");
  } else {
    // hash th password using bcrypt

    const saltRounds = 10; // Number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword; // replace the origin password with a hashed password
    const userdata = await collection.insertMany(data);

    console.log(userdata);
  }
});
// login user
app.post("/login", async (req, res) => {
  const check = await collection.findOne({ name: req.body.username });
  if (!check) {
    res.send("user name cannot found");
  }
  // comparing the hash password from the database with the plain text
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    check.password
  );
  if (isPasswordMatch) {
    res.render("home");
  } else {
    req.send("wrong password");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
