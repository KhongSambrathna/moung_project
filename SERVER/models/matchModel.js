import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
      },
      team: {
        type: String,
        required: true,
      },
      opponent: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      league: {
        type: String,
        required: true,
      },
      result: {
        type: String,
        required: true,
      }
});
//In string is userCollection (user Table)
export default mongoose.model("match_histories",MatchSchema);