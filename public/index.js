var requestURL = "http://localhost:3000/users";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
var myTable = document.querySelector("#dataTable");

function fillTable(data) {
  data.forEach(function (object) {
    var tr = document.createElement("tr");
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
}

function getUser(data) {
  fillTable(data);
}

request.onload = function () {
  var users = request.response;
  getUser(users);
};
