const express = require("express");
var cors = require("cors");
const {connection} = require("./src/Config/db");
const {Member} = require("./src/Routes/Member.routes");
const {authentication} = require("./src/Middleware/Authentication");
const {authorization} = require("./src/Middleware/Authorization");
const {Dashboard} = require("./src/Routes/Dashboard.Routes");
const {DataRouter} = require("./src/Routes/Data.Routes");
const {SignupRoute} = require("./src/Routes/Signup.Routes");
const {LoginRoute} = require("./src/Routes/Login.Routes");
const {CartRoute} = require("./src/Routes/Cart.Routes");
const app = express();
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("hello users");
});
app.use(express.json());
app.use(cors());
app.use("/member", Member);
app.use("/dashboard", authentication, authorization("admin"), Dashboard);
app.use("/data", DataRouter);
app.use("/resources/images", express.static("images"));
app.use("/signup", SignupRoute);
app.use("/login", LoginRoute);
app.use("/cart", CartRoute);
app.use("/",(req,res)=>{
  res.send("Welcome To clothing Aura Backend")
})
app.listen(8400, async () => {
  try {
    await connection;
    console.log("Connected To DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Listening To Port");
});
