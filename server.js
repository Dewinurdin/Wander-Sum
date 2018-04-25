<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const path = require('path');
const routes = require('./routes/user-route/userRoute');
const paymentApi = require('./payment');
const db = 'mongodb://localhost/users';
=======
const express = require("express");
>>>>>>> ebb01fcf1580d3e9fa26ce89de028cf9432eb703
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server); //Binding socket
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const db = "mongodb://localhost/users";
const PORT = process.env.PORT || 5000;


app.use(cookieParser()); // configure Cookie Parser
//Setting up connection to mongoose
const connection = mongoose.connection;
//Making sure Mongoose is Connected
connection
  .once("open", function() {
    console.log("Mongoose Connected!");
  })
  .on("error", function() {
    console.log("Error loading Mongoose");
    //Throw Error if any
  });

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(db);
// Use morgan logger for logging requests
<<<<<<< HEAD
app.use(logger('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With, Content-Type, Accept');
  next();
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);
app.use(paymentApi);
=======
app.use(logger("dev"));
>>>>>>> ebb01fcf1580d3e9fa26ce89de028cf9432eb703

//setting up CORS
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use('/', routes);
// Set mongoose to leverage built in JavaScript ES6 Promises

// Set socket.io listeners.
io.on("connection", socket => {
  console.log("SOCKET CONNECTION", socket.id);
  socket.on("chat message", msg => {
    io.emit("chat message", msg); // send messages to everyone
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));