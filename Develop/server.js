const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("develop"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/api/workouts", (req, res) => {

});

app.post("/api/workouts", (req, res) => {

});

app.put("/api/workouts/:id", (req, res) => {
    
});

app.get("/api/workouts/range", (req, res) => {
    
});

app.get("/exercise", (req, res) => {
    
});

app.get("/stats", (req, res) => {
    
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
