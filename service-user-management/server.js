require("dotenv").config();
const express = require("express");
// const helmet = require('helmet');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connectDb");
const verifyJWT = require("./middlewares/verifyJWTMiddleware");

connectDB();
const app = express();

// // Use Helmet to set security headers
// app.use(helmet());

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "trusted-cdn.com"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//     imgSrc: ["'self'", "data:"],
//   },
// }));

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/learnup/api/user-management", (req, res) => {
  res.send("user managers service responded");
});

app.use(
  "/learnup/api/user-management/auth",
  require("./routes/auth-login.routes")
);

app.use(
  "/learnup/api/user-management/auth",
  require("./routes/auth-register.routes")
);
app.use(verifyJWT);
app.use(errorHandler);

// let serverPromise = new Promise((resolve, reject) => {
//   mongoose.connection.once("open", () => {
//     console.log(`🚀 data connection with users collection established! 🚀`);
//     const server = app.listen(PORT, () => {
//       console.log(
//         `👦 User management service is up and running on port: ${PORT} 👦`
//       );
//       resolve(server);
//     });
//   });
// });

let serverPromise = new Promise((resolve, reject) => {
  mongoose.connection.once("open", () => {
    console.log("🚀 data connection with users collection established! 🚀");
    const server = app.listen(PORT, () => {
      console.log("👦 User management service is up and running on port: " + PORT + " 👦");
      resolve(server);
    });
  });
});

module.exports = { app, serverPromise };
