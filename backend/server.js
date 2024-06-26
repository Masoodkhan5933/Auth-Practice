const express = require("express");
require('dotenv').config();
const cors = require("cors");

const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");

const app = express();

const corsOptions = {
  origin: [
    'https://auth-practice-frontend.onrender.com',
    'http://localhost:3000',
    'https://auth-practice-kk54avy8m-masoodkhan5933s-projects.vercel.app'
  ],
  credentials: true,  // Allow credentials like cookies to be sent
};

app.use(cors(corsOptions));

mongoose.set('strictQuery', false);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// Use the environment variable for MongoDB connection
const mongoURI = process.env.db;

if (!mongoURI) {
  console.error("Error: MongoDB connection string is not defined in environment variables.");
  process.exit(1);
}

db.mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Masood Khan application.   FOR CHECKING DEPLOYMENT" });
});


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
