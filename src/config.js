// create a database connection
const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.x8d1lyy.mongodb.net/users?retryWrites=true&w=majority"
);
// check connection built or not with database
connect
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch(() => {
    console.log("database cannot be connected");
  });

// create a schema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// collection part
const collection = new mongoose.model("users", loginSchema);
module.exports = collection;
