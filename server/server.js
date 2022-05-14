const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/checkout.routes");
const registerRouter = require("./routes/register.routes");
const resetRouter = require("./routes/reset.routes");
const resetpasswordRouter = require("./routes/resetpassword.routes");
const phoneController = require("./controllers/phoneController");
const UserPage = require('./controllers/userPage.Controller');

const port = 8000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.header("X-Requested-With", "3.2.1");
  res.header("Content-Type", "application/json;charset=tf-8");
  next();
});

app.use("/register", registerRouter);
app.use("/reset", resetRouter);
app.use("/resetpassword", resetpasswordRouter);
app.use("/checkout", router);
app.get("/phone", phoneController.apiGetAllPhoneService);
app.get("/brand", phoneController.apiGetBrandService);
app.get("/phoneinfo", phoneController.apiGetPhoneInfo);
app.get("/Soldout", phoneController.apiGetSoldOutService);
app.get("/Bestseller", phoneController.apiGetBestSellerService);
app.get("/Search", phoneController.apiGetSearchService);
app.get("/highestValue", phoneController.apiGetHighestValue);
app.get("/addreview", phoneController.apiAddReview);
app.get("/getreview", phoneController.apiGetReview);
app.get("/allreview", phoneController.apiGetAllReview);

app.get('/userPage',UserPage.apiGetUserInfo);
app.post('/updateUserPage',UserPage.apiSetUserInfo);
app.post('/setPassword',UserPage.apiSetPassword);
app.post('/addList',UserPage.apiAddList);
app.post('/userPhone',UserPage.apigetPhoneInfo);
app.post('/deletePhone',UserPage.apideletePhone);
app.post('/getComments',UserPage.apigetComments);
app.post('/getReviewers',UserPage.apiGetReviewerInfo);
app.post('/enable',UserPage.apiEnable);
app.post('/disable',UserPage.apiDisable);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
