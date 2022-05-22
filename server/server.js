const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const checkoutRouter = require("./routes/checkout.routes");
const registerRouter = require("./routes/register.routes");
const loginRouter = require("./routes/login.routes");
const logoutRouter = require("./routes/logout.routes");
const authenticateRouter = require("./routes/authenticate.routes");
const resetRouter = require("./routes/reset.routes");
const resetpasswordRouter = require("./routes/resetpassword.routes");
const homepageRouter = require("./routes/homepage.routes");
const userpageRouter = require("./routes/userpage.routes");

const port = 8000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      secure: false,
      // Expired in an hour
      maxAge: 3600000,
    },
    unset: "destroy", // The session will be destroyed (deleted) when the response ends.
  })
);

app.use("/", homepageRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/authenticate", authenticateRouter);
app.use("/reset", resetRouter);
app.use("/resetpassword", resetpasswordRouter);
app.use("/checkout", checkoutRouter);
app.use("/user", userpageRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
