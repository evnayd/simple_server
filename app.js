const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    res.json(users);
  });
});

app.get("/user/:id", function (req, res) {
  //res.send("user " + req.params.id);
  //let's send back a user with id===req.params.id
  let id = req.params.id;
  res.send("user " + id);
});

app.post("/user", function (req, res) {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);
    const newUser = req.body;
    console.log(req.body);

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
    //const userId = req.params.id;
    console.log(userId);
    var newUsers = users.filter((item) => item.id !== userId);
    console.log(newUsers);
    fs.writeFile("./users.json", JSON.stringify(newUsers), (err) => {
      if (err) throw err;
      console.log("The user has been deleted!");
      res.json(newUsers);
    });
  });
});

//on put request user should be updated with data from request body
app.put("/user/:id", function (req, res) {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);

    const userId = req.params["id"];
    const userName = req.params["body"];
    var newUsers = users.map((item) => {
      if (item.id === userId) {
        item.name == userName;
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
