const express = require("express");
const bodyParser = require('body-parser')
const fs = require("fs");

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'))

app.get("/user", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    res.json(users);
  });
});

app.get("/user/:id", function (req, res) {
  res.send("user " + req.params.id);
  //let's send back a user with id===req.params.id
});

app.post("/user", function (req, res) {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);

    //get new user info from request and replace static newUser variable
    console.log(req.body)

    const newUser = {
      id: "06",
      "e-mail": "1@gmail.com",
      name: "Ivan",
      age: "34",
      city: "Samara",
    };

    let newUsers = users.concat(newUser);

    fs.writeFile("./users.json", JSON.stringify(newUsers), (err) => {
      if (err) throw err;
      console.log("The user has been saved!");
      res.json(newUsers);
    });
  });
});

app.delete("/users/:id", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);
    const userId = req.params["id"];

    var findIt = users.findIndex((item) => item.id === userId);

    users.splice(findIt, 1);

    fs.writeFile("./users.json", JSON.stringify(users), (err) => {
      if (err) throw err;
      console.log("The user has been deleted!");
      res.json(users);
    });
  });
});

app.put("/user/:id", function (req, res) {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);

    const userId = req.params["id"];

    var newUsers = users.map((item) => {
      if (item.id === userId) {
        item.name = "Elena";
      }
      return item;
    });

    fs.writeFile("./users.json", JSON.stringify(newUsers), (err) => {
      if (err) throw err;
      console.log("The user has been changed!");
      res.json(newUsers);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`);
});
