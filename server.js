const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "face-app"
  }
});

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send(database.users);
// });

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

//Dependency Injection
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

/*When the id is found, we do not need to keep-looping it
 */
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

// To count how many times a user submits an image, so that
// we can check which user submitted the most images and give them a ranking
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleAPIcall(req, res);
});

app.listen(PORT, () => {
  console.log(`Listening to PORT - ${PORT}!`);
});

