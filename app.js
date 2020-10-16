const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.get("/", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    res.json(users);
  });
});

app.get("/user/:id", function (req, res) {
  res.send("user " + req.params.id);
});

app.post("/user", function (req, res) {
  fs.readFile("./users.json", (err, data) => {
    //получить список пользователей из файла (массив)
    let users = JSON.parse(data);

    //создать объект нового юзера
    const newUser = {
      id: "06",
      "e-mail": "1@gmail.com",
      name: "Ivan",
      age: "39",
      city: "Samara",
    };

    //добавить нового юзера в массив
    let newUsers = users.concat(newUser);
    res.json(newUsers);
    //полученный массив записать в файл

    fs.writeFile("./users.json", (err, data) => {
      if (err) throw err;
      console.log("The user has been saved!");
    });
  });
});

app.delete("/users/:id", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    let users = JSON.parse(data);
    const userId = req.params["id"];
    //удалить
    var findIt = users.findIndex((item) => item.id === userId);

    users.splice(findIt, 1);
    res.json(users);

    fs.writeFile("./users.json", (err, data) => {
      if (err) throw err;
      console.log("The user has been deleted!");
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

    res.json(newUsers);

    fs.writeFile("./users.json", (err, data) => {
      if (err) throw err;
      console.log("The user has been changed!");
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`);
});
