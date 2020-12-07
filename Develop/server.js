const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const Workout = require("./models/Workout");

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(morgan("developer"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.get("/api/workouts", (req, res) => {
  // find method to get all instances of workout
  Workout.find()
    // then return json data
    .then((data) => {
      res.json(data);
    })
    // catch/print error
    .catch((err) => {
      console.log(err.message);
    });
});

app.post("/api/workouts", (req, res) => {
  // create new workout document instance
  const createNewWorkout = new Workout({
    day: new Date()
  });
  // save it to the db or handle error
  createNewWorkout.save(error => {
    if (error) return handleError(error);
  });
  // return new doc inst as json
  res.json(createNewWorkout);
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.findById({ _id: req.params.id }, (error, result) => {
    if (error) return handleError(error);
    // push request to exercises array within result
    result.exercises.push(req.body);
    // and save to db
    result.save();
  });
});

app.get("/api/workouts/range", (req, res) => {
    Workout.find().then(data => {
        res.json(data);
    })
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.redirect("/stats.html");
});



app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
