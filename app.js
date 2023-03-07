const express = require("express");
// Cria servidor
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const db = require("./db/connection");
const bodyParcer = require("body-parser");
const Job = require("./models/Job");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT);

app.use(bodyParcer.urlencoded({ extended: false }));

// Handle bars
// Diretorio das views, onde ficara os tamplates
app.set("views", path.join(__dirname, "views"));
// Aquivo principal de layout
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
// View engine, framework/biblioteca que sera utilizada para renderizar as views
app.set("view engine", "handlebars");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Data base connection
db.authenticate();

// Routes
app.get("/", (req, res) => 
{
  let search = req.query.job;
  let query = '%' + search + '%';

  if (!search) 
  {
    Job
    .findAll({ order: [["createdAt", "ASC"]] })
    .then((jobs) => 
    {
      res.render("layouts/index", { jobs });
    })
    .catch(err => console.log(err));
  }
  else
  {
    Job
    .findAll({ where: {title: {[Op.like]: query}}, order: [["createdAt", "ASC"]] })
    .then((jobs) => 
    {
      res.render("layouts/index", { jobs, search });
    })
    .catch(err => console.log(err));
  }
});

// Jobs Routes
app.use("/jobs", require("./routes/jobs"));
