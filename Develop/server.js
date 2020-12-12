const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const Workout = require("./models/Workout");

const PORT = process.env.PORT || 3000;

const app = express();

// middleware (comment out morgan to avoid too much feedback on the CL while debugging)
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// mongoose connection (need to update for atlas)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.get("/api/workouts", (req, res) => {
  // find method (unspecified) to get all data from workout instances
  Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get("/api/workouts/range", (req, res) => {
  // same as above, but the range will utilize chart.js to render charts displaying the range of workouts
  Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  // redirect here instead of sending file, simpler result
  res.redirect("/stats.html");
});

app.post("/api/workouts", ({ body }, res) => {
  // create method for new workout instance, passing object body from post to create to follow schema
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  // pass body and params object to locate by id (params) and update based on schema structure (body)
  Workout.findByIdAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } }
  ).then((Workout) => {
    res.json(Workout).catch((err) => {
      res.json(err);
    });
  });
});


app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
