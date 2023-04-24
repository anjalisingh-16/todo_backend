const express = require("express");
const cors = require("cors");
const app = express();
require("./conn.js");
const Register = require("./models/regschema.jsx");
const Task = require("./models/todoschema.js");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  try {
    const registerUser = new Register({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const registered = await registerUser.save();
    resp.send(registered);
  } catch (err) {
    resp.send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let pass = req.body.password;
    // console.log(email, pass);
    const user = await Register.findOne({ email: email });
    console.log("find :", user);
    console.log();
    if (user === null) {
      res.status(401).send("user not exists!");
    } else if (user.password !== pass) {
      res.status(401).send("Wrong Email or password");
    } else {
      res.send("Login successful");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/todo", async (req, resp) => {
  try {
    const taskdata = new Task({
      heading: req.body.heading,
      subheading: req.body.subheading,
      date: req.body.date,
    });
    const savedata = await taskdata.save();
    resp.send(savedata);
  } catch (err) {
    resp.send(err);
  }
});
app.get("/all", async (req, resp) => {
  const response = await Task.find({});
  resp.send(response);
});
app.put("/update", async (req, resp) => {
  const search = await Task.find({ _id: req.body.id });
  search[0].heading = req.body.heading;
  search[0].subheading = req.body.subheading;
  search[0].date = req.body.date;
  const saved = await search[0].save();
  console.log(saved);
  resp.send(saved);
});

app.delete("/delete/:id", async (req, resp) => {
  try {
    const response = await Task.findByIdAndDelete({ _id: req.params.id });
    resp.send(response);
    console.log(response);
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .send({ error: "An error occurred while deleting the task." });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
