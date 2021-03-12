require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const hospRouter = require("./routes/Hosp");
const path = require("path");
const secret = process.env.JWT_SECRET || "local_dev";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// const PORT = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, "capstoneFrontend", "build")));

<<<<<<< HEAD
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "capstoneFrontend", "build", "index.html"));
});
=======
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "capstoneFrontend", "build", "index.html"));
// });
>>>>>>> c3bd82d02b764f2ca89aba35d74c3cff82241909

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

const LOCAL_DB = "mongodb://127.0.0.1:27017/medishare_db";
mongoose.connect(
  process.env.MONGODB_URL || LOCAL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], secret, function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.id = decoded.id;
      res.locals.id = decoded.id;
      next();
    }
  });
}

app.use("/users", usersRouter);

app.use("/catalog", catalogRouter);

app.use("/api", hospRouter);

if(process.env.NODE_ENV === 'production')
{
app.use(express.static(path.join(__dirname, '/capstoneFrontend/build')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'capstoneFrontend', 'build', 'index.html'));
});
} else {
 app.get('/', (req, res) => {
    res.send('API running')
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});
