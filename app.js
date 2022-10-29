const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// For pug template determination
app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

// Access public folder's css elements in other folders html or template engines elements
app.use(express.static(path.join(__dirname, "public")));

// Define routing path for page
app.use("/admin", adminData.routes);
app.use(shopRoute);

// Showing error page
app.use((req, res, next) => {
  res.status(404).render("page-not-found", { docTitle: "Error" });
});

app.listen(3000);
