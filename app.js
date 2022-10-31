const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// For ejs template engine
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const errorControler = require("./controlers/error");

app.use(bodyParser.urlencoded({ extended: false }));

// Access public folder's css elements in other folders html or template engines elements
app.use(express.static(path.join(__dirname, "public")));

// Define routing path for admin
app.use("/admin", adminRoutes);

// Define routing path for shop
app.use(shopRoute);

// Showing error page
app.use(errorControler.get404);

app.listen(3000);
