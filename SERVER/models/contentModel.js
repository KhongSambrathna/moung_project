import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date_published: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  cover_url: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("news",ContentSchema);
