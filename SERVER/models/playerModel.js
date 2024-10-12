//4
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
      currentGrade: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      village: {
        type: String,
        required: true,
      },
      appearances: {
        type: Number,
        default: 0,
      },
      goals: {
        type: Number,
        default: 0,
      },
      assists: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: Number,
        default: 0,
      }
});
//In string is userCollection (user Table)
export default mongoose.model("players",playerSchema);