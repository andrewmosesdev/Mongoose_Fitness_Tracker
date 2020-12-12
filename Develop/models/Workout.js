const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      // default Date.now returns the current unix timestamp as a number
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
        },
        name: {
          type: String,
        },
        duration: {
          type: Number,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ]
  },
  opts
);


// mongoose virtual needs ES5 function here, arrow function is lexically bound ('this' will refer to the function it's inside) and will result in an error
workoutSchema.virtual("totalDuration").get(function() {
  let durationSum = 0;
  this.exercises.forEach((sum) => {
    durationSum += sum.duration;
  });
  return durationSum;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
