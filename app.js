const express = require("express");
const app = express();
const path = require("path");

const axios = require("axios").default;

const options = {
  method: "GET",
  url: "https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity",
  params: { name: "Michael Jordan" },
  headers: {
    "x-rapidapi-host": "celebrity-by-api-ninjas.p.rapidapi.com",
    "x-rapidapi-key": "8999b40b4amshae5336614ba90e9p153d23jsn1ad4e5358796",
  },
};

function getCeleb() {
  return axios.request(options).then((response) => response.data);
}

let celebrity = {};

app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  getCeleb()
  .then((data) => {
    celebrity = data[0];
    res.render("home", celebrity);
  })
  .catch((err) => console.log(err))
});

app.listen(3001, () => console.log("listening"));
