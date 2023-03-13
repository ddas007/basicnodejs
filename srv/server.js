const express = require("express");
const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;
const services = xsenv.getServices({ uaa:"basicnodejs-xsuaa" });  // XSUAA service

const app = express();

passport.use(new JWTStrategy(services.uaa));
app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

app.get("/", function (req, res, next) {
  res.send("Welcome User from local: " + req.user.name.givenName);
});

const port = process.env.PORT || 4004;
app.listen(port, function () {
  console.log("Basic NodeJs listening on port " + port);
});