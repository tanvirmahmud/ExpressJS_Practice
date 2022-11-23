const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// For ejs template engine
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorControler = require("./controlers/error");

app.use(bodyParser.urlencoded({ extended: false }));

// Access public folder's css elements in other folders html or template engines elements
app.use(express.static(path.join(__dirname, "public")));

// Define routing path
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Showing error page
app.use(errorControler.get404);

app.listen(3000);
