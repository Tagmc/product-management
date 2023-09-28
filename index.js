const express = require("express");
const path = require('path');
const database = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config();
const route = require("./routes/client/index.route");
const routeadmin = require("./routes/admin/index.route")
const systemConfig = require("./config/system.js")
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Flash
app.use(cookieParser("HUYDAIK")); // phải cài đặt cả cookieParser
app.use(session({cookie: {maxAge:  60000}}));
app.use(flash());
//End Flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname,'node_modules', 'tinymce')));

//end tinymce

app.use(express.static(`${__dirname}/public`))
//routes
route(app);
routeadmin(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})