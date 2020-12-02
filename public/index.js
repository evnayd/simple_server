var requestURL = "http://localhost:3000/users";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

var myTable = document.querySelector("#dataTable");
console.log(myTable);
var userId = document.querySelector(".id");
console.log(userId);
var userEmail = document.querySelector(".email");
console.log(userEmail);
var userName = document.querySelector(".name");
console.log(userName);
var userAge = document.querySelector(".age");
var userCity = document.querySelector(".city");
var ourTd = document.querySelector("td");

//вот это работает, но не заполняет существую таблицу, а создает свои tr;

/*function fillTable(data) {
  data.forEach(function (object) {
    var tr = document.createElement("tr");
    console.log(tr);
    tr.innerHTML =
      "<td>" +
      object.id +
      "</td>" +
      "<td>" +
      object.name +
      "</td>" +
      "<td>" +
      object.email +
      "</td>" +
      "<td>" +
      object.age +
      "</td>" +
      "<td>" +
      object.city +
      "</td>";
    myTable.appendChild(tr);
  });
}*/

// вот это работает только для последнего объекта из users; и только если выбрать
//var userId = document.querySelector(".id") а не  document.querySelectorAll(".id");

var fillTable = function (data) {
  data.forEach(function (object) {
    userId.innerHTML = object.id;
    userName.innerHTML = object.name;
    userEmail.innerHTML = object.email;
    userAge.innerHTML = object.age;
    userCity.innerHTML = object.city;
  });
};

request.onload = function () {
  var users = request.response;
  fillTable(users);
};
