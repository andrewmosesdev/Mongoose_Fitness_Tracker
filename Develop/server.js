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
  Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get("/api/workouts/range", (req, res) => {
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
  res.redirect("/stats.html");
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
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
